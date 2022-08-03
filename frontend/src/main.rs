use yew::prelude::*;

#[function_component(App)]
fn app() -> Html {
    html! {
        <>
            <Header />
            <Poll />
            <Footer />
    </>
    }
}
fn main() {
    yew::start_app::<App>();
}

#[function_component(Poll)]
fn poll() -> Html {
    html! {
    <form action="/vote" method="post" class="poll">
          <div class="red-margin"></div>
          <div class="question">
            <input
              type="text"
              placeholder="Type your question here"
              class="question-input noSelect"
              name="question"
            />
          </div>
          <input
            type="text"
            placeholder="Enter Option"
            class="option-input noSelect"
            name="option1"
          /><input
            type="text"
            placeholder="Enter Option"
            class="option-input noSelect"
            name="option2"
          /><input
            type="text"
            placeholder="Enter Option"
            class="option-input noSelect"
            name="option3"
          />
          <div class="poll-create">
            <button type="submit" class="btn btn-primary btn-lg">
            {"Create Poll"}
            </button>
          </div>
        </form>
    }
}
#[function_component(Header)]
fn header() -> Html {
    html! {
    <div class="title">
      <h1>{"Pref Poll"}</h1>
      <h2>{"The place to create quick preference polls for free!"}</h2>
    </div>
    }
}

#[function_component(Footer)]
fn footer() -> Html {
    html! {
    <footer>
      <span class="copyright">{"Copyright ethyi"}</span>
    </footer>
    }
}
