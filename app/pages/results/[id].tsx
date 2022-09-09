import Layout from "../../components/layout";
import Head from "next/head";
import styles from "../../styles/Result.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import CopyToClipboard from "../../components/CopyToClipboard";

interface Poll {
  id: string[] | undefined | string;
  question: string;
  options: string[];
  createdAt: string;
  totalVotes: number;
  rankings: number[][];
  duplicationError: boolean;
}
function ResultDisplay({ poll }: { poll: Poll }) {
  const baseUrl = window.location.origin;
  return (
    <div className={styles.poll}>
      <div className={styles.redMargin}></div>
      <div className={styles.question}>
        <div className={styles.questionDisplay}>{poll.question}</div>
      </div>

      <div className={styles.numberAndOptionContainer}>
        <div className={styles.optionsContainer}>
          {poll.rankings.map((arr, index) => (
            <div key={"ranked" + index}>
              <div className={styles.optionDisplay}>
                <div className={styles.optionNumber}>
                  {(index + 1).toString()}
                </div>
                <div className={styles.optionText}>{poll.options[arr[0]]}</div>
              </div>
              {arr.slice(1).map((option) => (
                <div
                  key={"tiebreak:" + option}
                  className={styles.optionDisplay}
                >
                  <div className={styles.optionNumber}></div>
                  <div className={styles.optionText}>
                    {poll.options[option]}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pollStats}>
        <p>Created on: {poll.createdAt}</p>
        <p>Total Votes: {poll.totalVotes}</p>
        {poll.duplicationError && (
          <p className={styles.errorMessage}>
            You have already voted and cannot access the vote page for this
            poll.
          </p>
        )}
      </div>
      <div className={styles.pollButtons}>
        <CopyToClipboard>
          {({ copy }) => (
            <Button
              variant="contained"
              size="small"
              onClick={() => copy(baseUrl + `/vote/${poll.id}`)}
            >
              Copy Vote Link
            </Button>
          )}
        </CopyToClipboard>
        <CopyToClipboard>
          {({ copy }) => (
            <Button
              variant="contained"
              size="small"
              onClick={() => copy(baseUrl + `/results/${poll.id}`)}
            >
              Copy Result Link
            </Button>
          )}
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default function Result() {
  const router = useRouter();
  const [poll, setPoll] = useState<Poll>();
  useEffect(() => {
    if (!router.isReady) return;
    const { id, err } = router.query;
    axios
      .get(`http://localhost:8000/vote/${id}/r`)
      .then((res) => {
        let data = res.data;
        console.log(data);
        let date = new Date(data.created_at).toLocaleDateString();
        console.log(err);
        let result: Poll = {
          id: id,
          question: data.question,
          options: JSON.parse(data.options),
          createdAt: date,
          totalVotes: data.num_votes,
          rankings: JSON.parse(data.rankings),
          duplicationError: !!err,
        };
        setPoll(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady, router.query]);
  if (poll === undefined) {
    return <>Loading ....</>;
  }
  return (
    <Layout>
      <ResultDisplay poll={poll} />
    </Layout>
  );
}
