/**
 * Oscar prediction model implemented in TypeScript
 * This replaces the Python-based predictor with a TypeScript implementation
 */

import {
  Nomination,
  AwardWin,
  Reference,
  ModelWeight,
  NomineeData,
  PredictionFeatures,
  VenueStrength
} from './types';
import { AWARD_VENUES } from './constants';
import { convertProbabilityToOdds } from './mock-data';

export class OscarPredictor {
  private featureWeights: Record<string, Record<string, number>> = {};
  private categoryAccuracy: Record<string, Record<string, number>> = {};
  private trained: boolean = false;
  
  /**
   * Train the model on historical data
   * @param nominations Historical Oscar nominations
   * @param awardWins Historical award wins from other venues
   */
  public train(nominations: Nomination[], awardWins: AwardWin[]): void {
    // Group nominations by category
    const categoriesMap: Record<string, Nomination[]> = {};
    for (const nomination of nominations) {
      if (!categoriesMap[nomination.category]) {
        categoriesMap[nomination.category] = [];
      }
      categoriesMap[nomination.category].push(nomination);
    }
    
    // Train for each category
    for (const [category, categoryNominations] of Object.entries(categoriesMap)) {
      // Skip categories with insufficient data
      if (categoryNominations.length < 10) {
        continue;
      }
      
      // Calculate feature importances for this category
      this.featureWeights[category] = this.calculateFeatureWeights(categoryNominations, awardWins);
      
      // Calculate accuracy for each venue in this category
      this.categoryAccuracy[category] = this.calculateVenueAccuracy(categoryNominations, awardWins);
    }
    
    this.trained = true;
  }
  
  /**
   * Calculate feature weights for a specific category
   * This determines how predictive each award venue is for Oscar winners
   */
  private calculateFeatureWeights(
    nominations: Nomination[],
    awardWins: AwardWin[]
  ): Record<string, number> {
    const weights: Record<string, number> = {};
    
    // Create a map of nomination IDs to their award wins
    const awardWinMap: Record<number, AwardWin[]> = {};
    for (const win of awardWins) {
      if (!awardWinMap[win.nominationId]) {
        awardWinMap[win.nominationId] = [];
      }
      awardWinMap[win.nominationId].push(win);
    }
    
    // For each award venue, calculate its predictive power
    for (const venue of AWARD_VENUES) {
      let correctPredictions = 0;
      let totalPredictions = 0;
      
      // Group nominations by year
      const yearlyNominations: Record<number, Nomination[]> = {};
      for (const nomination of nominations) {
        if (!yearlyNominations[nomination.year]) {
          yearlyNominations[nomination.year] = [];
        }
        yearlyNominations[nomination.year].push(nomination);
      }
      
      // Analyze each year
      for (const [year, yearNoms] of Object.entries(yearlyNominations)) {
        const oscarWinner = yearNoms.find(n => n.wonOscar);
        if (!oscarWinner) continue;
        
        // Check if this venue correctly predicted the Oscar winner
        const winnerAwards = awardWinMap[oscarWinner.id] || [];
        const venueWin = winnerAwards.find(win => win.awardVenue === venue && win.won);
        
        if (venueWin) {
          correctPredictions++;
        }
        
        totalPredictions++;
      }
      
      // Calculate weight based on accuracy
      const accuracy = totalPredictions > 0 ? correctPredictions / totalPredictions : 0;
      weights[venue] = accuracy;
    }
    
    // Normalize weights to sum to 1
    const weightSum = Object.values(weights).reduce((sum, w) => sum + w, 0);
    if (weightSum > 0) {
      for (const venue of Object.keys(weights)) {
        weights[venue] /= weightSum;
      }
    }
    
    return weights;
  }
  
  /**
   * Calculate accuracy for each venue in a specific category
   */
  private calculateVenueAccuracy(
    nominations: Nomination[],
    awardWins: AwardWin[]
  ): Record<string, number> {
    const accuracy: Record<string, number> = {};
    
    // Create a map of nomination IDs to their award wins
    const awardWinMap: Record<number, AwardWin[]> = {};
    for (const win of awardWins) {
      if (!awardWinMap[win.nominationId]) {
        awardWinMap[win.nominationId] = [];
      }
      awardWinMap[win.nominationId].push(win);
    }
    
    // For each award venue, calculate its accuracy
    for (const venue of AWARD_VENUES) {
      let correctPredictions = 0;
      let totalPredictions = 0;
      
      // Group nominations by year
      const yearlyNominations: Record<number, Nomination[]> = {};
      for (const nomination of nominations) {
        if (!yearlyNominations[nomination.year]) {
          yearlyNominations[nomination.year] = [];
        }
        yearlyNominations[nomination.year].push(nomination);
      }
      
      // Analyze each year
      for (const [year, yearNoms] of Object.entries(yearlyNominations)) {
        const oscarWinner = yearNoms.find(n => n.wonOscar);
        if (!oscarWinner) continue;
        
        // Check if this venue correctly predicted the Oscar winner
        const winnerAwards = awardWinMap[oscarWinner.id] || [];
        const venueWin = winnerAwards.find(win => win.awardVenue === venue && win.won);
        
        if (venueWin) {
          correctPredictions++;
        }
        
        totalPredictions++;
      }
      
      // Calculate accuracy
      accuracy[venue] = totalPredictions > 0 ? (correctPredictions / totalPredictions) * 100 : 0;
    }
    
    return accuracy;
  }
  
  /**
   * Prepare features for prediction
   */
  private prepareFeatures(
    nomination: Nomination,
    awardWins: AwardWin[]
  ): PredictionFeatures {
    const features: PredictionFeatures = {};
    
    // Get award wins for this nomination
    const nominationWins = awardWins.filter(win => win.nominationId === nomination.id && win.won);
    
    // Set feature values based on award wins
    for (const venue of AWARD_VENUES) {
      features[venue] = nominationWins.some(win => win.awardVenue === venue) ? 1 : 0;
    }
    
    return features;
  }
  
  /**
   * Calculate prediction likelihood
   */
  private calculateLikelihood(
    features: PredictionFeatures,
    categoryWeights: Record<string, number>
  ): number {
    let likelihood = 0;
    
    // Weighted sum of features
    for (const [venue, weight] of Object.entries(categoryWeights)) {
      likelihood += (features[venue] || 0) * weight;
    }
    
    // Scale to percentage (0-100)
    return Math.round(likelihood * 100);
  }
  
  /**
   * Get list of award venues that support this nominee
   */
  private getAwardSupport(features: PredictionFeatures): string {
    const supportingVenues = AWARD_VENUES.filter(venue => features[venue] === 1);
    return supportingVenues.length > 0 ? supportingVenues.join(', ') : '';
  }
  
  /**
   * Predict Oscar winners for current nominees
   * @param nominations Current Oscar nominations
   * @param awardWins Current award wins from other venues
   * @param bettingOdds Betting odds data
   * @param predictiveMarkets Predictive markets data
   */
  public predict(
    nominations: Nomination[],
    awardWins: AwardWin[],
    bettingOdds: Reference[],
    predictiveMarkets: Reference[]
  ): Record<string, NomineeData[]> {
    if (!this.trained) {
      throw new Error('Model must be trained before making predictions');
    }
    
    // Create a map of nomination IDs to betting odds and predictive markets
    const bettingMap: Record<number, number> = {};
    for (const odds of bettingOdds) {
      bettingMap[odds.nominationId] = odds.value;
    }
    
    const marketMap: Record<number, number> = {};
    for (const market of predictiveMarkets) {
      marketMap[market.nominationId] = market.value;
    }
    
    // Group nominations by category
    const result: Record<string, NomineeData[]> = {};
    
    for (const nomination of nominations) {
      if (!result[nomination.category]) {
        result[nomination.category] = [];
      }
      
      // Prepare features for this nominee
      const features = this.prepareFeatures(nomination, awardWins);
      
      // Get weights for this category
      const categoryWeights = this.featureWeights[nomination.category] || {};
      
      // Calculate prediction likelihood
      const likelihood = Object.keys(categoryWeights).length > 0
        ? this.calculateLikelihood(features, categoryWeights)
        : undefined;
      
      // Get award support
      const awardSupport = this.getAwardSupport(features);
      
      // Get betting odds and format as fractional
      const bettingValue = bettingMap[nomination.id];
      const bettingOdds = bettingValue 
        ? convertProbabilityToOdds(bettingValue)
        : undefined;
      
      // Get predictive market value
      const marketProbability = marketMap[nomination.id];
      
      result[nomination.category].push({
        id: nomination.id,
        nomineeName: nomination.nomineeName,
        filmTitle: nomination.filmTitle,
        category: nomination.category,
        nominationType: nomination.nominationType,
        likelihood,
        bettingOdds,
        marketProbability,
        wonOscar: nomination.wonOscar,
        awardSupport,
        year: nomination.year
      });
    }
    
    // Sort nominees by likelihood in each category
    for (const category of Object.keys(result)) {
      result[category].sort((a, b) => {
        if (a.likelihood === undefined && b.likelihood === undefined) return 0;
        if (a.likelihood === undefined) return 1;
        if (b.likelihood === undefined) return -1;
        return b.likelihood - a.likelihood;
      });
    }
    
    return result;
  }
  
  /**
   * Analyze venue strength
   * Returns data for visualization of which venues are most predictive
   */
  public analyzeVenueStrength(): VenueStrength[] {
    if (!this.trained) {
      throw new Error('Model must be trained before analyzing venue strength');
    }
    
    const result: VenueStrength[] = [];
    
    for (const [category, weights] of Object.entries(this.featureWeights)) {
      for (const [venue, weight] of Object.entries(weights)) {
        const accuracy = this.categoryAccuracy[category]?.[venue] || 0;
        
        result.push({
          category,
          venue,
          strength: weight * 100, // Convert to percentage
          accuracy
        });
      }
    }
    
    return result;
  }
}