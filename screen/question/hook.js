import { useEffect } from "react";

export function Hook(setQuestions, setLoader) {
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const responce = await fetch(
          "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
        );
        let jsonData = await responce.json();
        if (jsonData?.results) {
          setLoader(false);
          setQuestions(jsonData["results"]);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    })();
  }, []);
}
