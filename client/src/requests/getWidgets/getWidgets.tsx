import type { Widgets } from "./getWidgets.types";

export const getWidgets = async (): Promise<Widgets> => {
  const url = "http://localhost:3000/widgets";

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      console.log("Log error to logger", error);
      throw error;
    } else {
      console.log("Log error to logger", error);
      throw error;
    }
  }

  if (!response.ok) {
    throw new Error(
      `Something went wrong getting widgets. Status: ${response.status}`,
    );
  }

  const result = await response.json();

  return result;
};
