/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudyModule {
  id: string;
  title: string;
  topics: string[];
  duration: string;
  resources: string[];
}

export interface StudyPlan {
  title: string;
  targetGoal: string;
  overallDuration: string;
  modules: StudyModule[];
  tips: string[];
}
