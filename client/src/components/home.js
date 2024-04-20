import React, { useState } from "react";
import axios from "axios";
import "../styles/HomeStyle.css"
function AutoSuggest() {
  // const [input, setInput] = useState("");
  // const [suggestions, setSuggestions] = useState([]);

  // Function to fetch suggestions from the backend
  // const fetchSuggestions = () => {
  // axios
  //   .get(`/api/v1/expense/categories`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((response) => {
  //       // Assuming the backend returns an array of suggestion strings
  //       setSuggestions(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching suggestions:", error);
  //     });
  // };

  // Handler for input change
  const [results, setResults] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    const expenseData = {
      time: time,
      date: date,
      amount: amount,
      category: selectedCategory,
    };
    console.log(expenseData);
    axios
      .post("/api/v1/expense/update", expenseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Expense saved successfully:", response.data);
        const exp = response.data.expenses;
        if (exp[exp.length - 1].overspend) {
          alert("you overspended");
        }
        // Optionally reset form fields here
        setTime("");
        setDate("");
        setAmount("");
        setSelectedCategory("");
        // Display success message or handle further
      })
      .catch((error) => {
        console.error("Error saving expense:", error);
        // Display error message or handle error
      });
  };

  return (
    <>
      <div className="home-page">
        <form onSubmit={handleSubmit}>
          Enter the expense category:{" "}
          <input
            type="text"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          {/* <SearchResultsList results={results} /> */}
          <br />
          <br />
          Enter the time:{" "}
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <br />
          <br />
          Enter the date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <br />
          Enter the amount:{" "}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <br />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

const suggestionStyle = {
  border: "1px solid #ccc",
  maxHeight: "150px",
  overflowY: "auto",
};

const suggestionItemStyle = {
  padding: "5px",
  cursor: "pointer",
};

export default AutoSuggest;
