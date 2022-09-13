import {Section} from "../../catalogue-ui/domain/dynamic-form-model";

export class Survey {
  id: string;
  name: string;
  description: string;
  notice: string;
  type: string;
  creationDate: string;
  createdBy: string;
  modificationDate: string;
  modifiedBy: string;
  chapters: Section[];
}


export class SurveyAnswer {
  id: string;
  modelId: string;
  stakeholderId: string;
  chapterAnswers: Map<string, ChapterAnswer>;
  metadata: Metadata;
  validated: boolean;
  published: boolean;
  chapterId: string;


  constructor(chapterAnswers: Map<string, ChapterAnswer>, surveyId: string) {
    this.id = null;
    this.chapterAnswers = chapterAnswers;
    this.modelId = surveyId;
    this.metadata = null;
  }
}

export class ChapterAnswer {
  chapterId: string;
  answer: Object;
  metadata: Metadata;
  id: string;


  constructor(chapterId: string, answer: Object) {
    this.chapterId = chapterId;
    this.answer = answer;
  }
}

export class ResourcePermission {
  resourceId: string;
  permissions: string[];
}

export class Metadata {
  creationDate: string;
  createdDy: string;
  modificationDate: string;
  modifiedBy: string;
}

export class SurveyInfo {
  surveyId: string;
  surveyAnswerId: string;
  surveyName: string;
  validated: boolean;
  published: boolean;
  lastUpdate: Date;
  editedBy: string[];
  progressRequired: Progress;
  progressTotal: Progress;
  stakeholder: string;
}

export class Progress {
  current: number;
  total: number;
}
