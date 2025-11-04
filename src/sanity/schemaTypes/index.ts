import { projectType } from "./projectType";
import { photographyType } from "./photographyType";
import { writingType } from "./writingType";
import { bioType } from "./bioType";
import { writingCategoryType } from "./writingCategoryType";

export const schema = {
  types: [projectType, photographyType, writingType, bioType, writingCategoryType],
};
