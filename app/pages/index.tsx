import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/Creation.module.css";
import React from "react";
import Button from "@mui/material/Button";
import Layout from "../components/layout";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const MAXIMUM_OPTIONS = 20;
function PollForm() {
  const [poll, setPoll] = React.useState(["", "", "", ""]);
  const [error, setError] = React.useState(false);
  let duplication = React.useRef("none");
  const router = useRouter();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name: number = +e.target.name;
    poll[name] = e.target.value;
    if (name == poll.length - 1) {
      setPoll((prev) => [...prev, ""]);
    }
  }

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(poll);
    // clean data

    const question = poll[0];
    let options = poll.slice(1).map((element) => element.trim());
    options = options.filter((value) => {
      return value !== "";
    });

    options = options.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    if (!question || options.length > MAXIMUM_OPTIONS || options.length < 2) {
      setError(true);
      return;
    }
    let formString = `question=${question}&options=${JSON.stringify(
      options
    )}&duplication=${duplication.current}`;
    // console.log(formString);
    axios
      .post("http://localhost:8000/create_poll", formString)
      .then((response) => {
        // console.log(`statusCode: ${response.status}`);
        let id = response.data;
        // console.log(id);
        router.push("/vote/" + id);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function OptionInput({ id }: { id: string }) {
    // possibility of less rendering through memo, useCallback
    // console.log("id: " + id + " rendered");
    return (
      <input
        type="text"
        placeholder="Enter Option"
        className={styles.optionInput}
        onChange={handleChange}
        name={id}
        defaultValue={poll[+id]}
        autoFocus={+id == poll.length - 2 && poll[0].length != 0}
      />
    );
  }
  function QuestionInput() {
    return (
      <input
        autoFocus={true}
        type="text"
        placeholder="Type your question here"
        className={styles.questionInput}
        name="0"
        onChange={handleChange}
        defaultValue={poll[0]}
      />
    );
  }
  return (
    <form className={styles.poll} autoComplete="off" onSubmit={handleSubmit}>
      <div className={styles.redMargin}></div>
      <QuestionInput />
      <div>
        {poll.slice(1).map((value, index) => (
          <OptionInput key={index + 1} id={(index + 1).toString()} />
        ))}
      </div>
      {error && (
        <p className={styles.errorMessage}>
          Question must be filled. There may be 2 to {MAXIMUM_OPTIONS} unique,
          non-empty options.
        </p>
      )}
      <div className={styles.pollCreate}>
        <FormControl>
          <label className={styles.radioLabel}>Duplication check</label>
          <RadioGroup
            defaultValue={"none"}
            onChange={(e) => (duplication.current = e.target.value)}
            name="radio-buttons-group"
          >
            <FormControlLabel value="none" control={<Radio />} label="None" />
            <FormControlLabel
              value="cookie"
              control={<Radio />}
              label="Browser"
            />
            <FormControlLabel
              value="ip"
              control={<Radio />}
              label="IP Address"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" type="submit" size="large">
          Create Poll
        </Button>
      </div>
    </form>
  );
}
const Creation: NextPage = () => {
  return (
    <Layout>
      <PollForm />
    </Layout>
  );
};

export default Creation;
