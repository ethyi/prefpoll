import Layout from "../../components/layout";
import Head from "next/head";
import styles from "../../styles/Vote.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCookie, hasCookie } from "cookies-next";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Poll {
  id: string;
  question: string;
  options: string[];
  createdAt: string;
}

// need id, question, options string[], number
function VoteForm({ poll }: { poll: Poll }) {
  const [options, updateOptions] = useState(poll.options);
  const router = useRouter();

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    let optionToIndex: any = {};
    poll.options.forEach((option, i) => {
      optionToIndex[option] = i;
    });
    const formString = "order=[" + options.map((o) => optionToIndex[o]) + "]";
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/add_vote/${poll.id}`, formString)
      .then((response) => {
        // console.log(`statusCode: ${response.status}`);
        setCookie(poll.id, true, { sameSite: "lax" });
        router.push("/results/" + poll.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateOptions(items);
  }
  return (
    <div className={styles.poll}>
      <div className={styles.redMargin}></div>
      <div className={styles.question}>
        <div className={styles.questionDisplay}>{poll.question}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.numberAndOptionContainer}>
          <div className={styles.numbersContainer}>
            {poll.options.map((_, index) => (
              <div key={"numKey" + index}>
                <div className={styles.optionNumber}>{index + 1}</div>
                <div className={styles.notepadLines}></div>
              </div>
            ))}
          </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="options">
              {(provided) => (
                <div
                  className={styles.optionsContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {options.map((option, i) => (
                    <Draggable
                      key={"id" + option}
                      draggableId={"id" + option}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={
                            snapshot.isDragging
                              ? styles.optionDragging
                              : styles.optionDisplay
                          }
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className={styles.optionText}>{option}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className={styles.pollStats}>Created on: {poll.createdAt}</div>
        <div className={styles.pollButtons}>
          <Button variant="contained" type="submit" size="large">
            Vote
          </Button>
        </div>
      </form>
    </div>
  );
}

function json(url: string) {
  return fetch(url).then((res) => res.json());
}

export default function Vote() {
  const router = useRouter();
  const [poll, setPoll] = useState<Poll>();
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    if (typeof id !== "string") return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/vote/${id}`)

      .then((res) => {
        let data = res.data;
        // console.log(data);
        let date = new Date(data.created_at).toLocaleDateString();
        let result: Poll = {
          id: id,
          question: data.question,
          options: JSON.parse(data.options),
          createdAt: date,
        };
        if (
          (data.duplication === "ip" && data.ip_detected) ||
          (data.duplication === "cookie" && hasCookie(id))
        ) {
          // console.log("You have already voted!", data.ip);
          router.push("/results/" + id + "?err=true");
        } else {
          setPoll(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);
  if (poll === undefined) {
    return <>Loading ....</>;
  }
  return (
    <Layout>
      <VoteForm poll={poll} />
    </Layout>
  );
}
