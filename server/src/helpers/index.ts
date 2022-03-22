import fs from "fs/promises";
import path from "path";
import { APP_PATH } from "../config/config";

export const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const passwordRegex = /^[A-Za-z]\w{7,14}$/;

// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

type FnType = (...args: any[]) => any;

export const wrap = (fn: FnType): FnType => {
      return (...args: any[]) => {
            try {
                  fn(...args);
            } catch (error) {
                  console.log("error in wrap function; ", error);
            }
      };
};

export const generateCode = (n = 4) => {
      let code = Math.floor(Math.random() * 10 ** 4);
      return code.toString();
};

export const unlinkImg = async (name: string) => {
      await fs.unlink(path.resolve(APP_PATH, "uploads", name));
};

/**
 *
 * this data shouldn't change order
 *
 */

export const data = {
      // weights,
      min_weight: 5, // weight in pounds
      max_weight: 1000, // weight in pounds

      // heights,
      min_height: 55, // height in cm
      max_height: 280, // height in cm

      children_max: 3,

      min_age: 18,
      max_age: 70,

      genders: ["Male", "Female", "Other"],

      hair_colors: [
            "Auburn",
            "Bald",
            "Black",
            "Blonde",
            "Brown",
            "Brunette",
            "Charcoal",
            "Chestnut",
            "Golden",
            "Gray",
            "Red",
            "Silver",
            "White",
      ],

      eye_colors: ["Black", "Brown", "Blue", "Gray", "Green", "Hazel"],

      relegions: [
            "Non-believer",
            "Muslim",
            "Agnostic",
            "Another",
            "Baptist",
            "Buddhist",
            "Catholic",
            "Christian",
            "Jewish",
      ],

      habit: ["No", "Rarely", "Often", "Very often"],

      languages: [
            "Arabic",
            "English",
            "Japanese",
            "German",
            "Turkish",
            "French",
            "Russian",
            "Italian",
            "Greek",
            "Spanish",
            "Dutch",
            "Portuguese",
            "Polish",
            "Chinese",
            "Romanian",
      ],

      marital_status: ["single", "divorced", "separated", "widowed"],

      income: ["Low", "Medium", "Height"],
};
