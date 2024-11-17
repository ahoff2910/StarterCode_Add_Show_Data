// return element function
function r_e(id) {
  return document.querySelector(`#${id}`);
}

// Task 2: Querying Data

// 1.	Show all teams in Spain.
db.collection("teams")
  .where("country", "==", "Spain")
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q1").innerHTML = output;
  });

// 2.	Show all teams in Madrid, Spain
db.collection("teams")
  .where("country", "==", "Spain")
  .where("city", "==", "Madrid")
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q2").innerHTML = output;
  });

// 3.	Show all national teams (Remember there might be new national teams added later)
db.collection("teams")
  .where("city", "==", "Not applicable")
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q3").innerHTML = output;
  });

// 4.	Show all teams that are not in Spain
db.collection("teams")
  .where("country", "!=", "Spain")
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q4").innerHTML = output;
  });

// 5.	Show all teams that are not in Spain or England
db.collection("teams")
  .where("country", "not-in", ["Spain", "England"])
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q5").innerHTML = output;
  });

// 6.	Show all teams in Spain with more than 700M fans
db.collection("teams")
  .where("country", "==", "Spain")
  .where("worldwideFans", ">", 700)
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q6").innerHTML = output;
  });

// 7.	Show all teams with a number of fans in the range of 500M and 600M
db.collection("teams")
  .where("worldwideFans", ">", 500)
  .where("worldwideFans", "<", 600)
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q7").innerHTML = output;
  });

// 8.	Show all teams where Ronaldo is a top scorer
db.collection("teams")
  .where("topScorers", "array-contains", "Ronaldo")
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q8").innerHTML = output;
  });

// 9.	Show all teams where Ronaldo,  Maradona, or Messi is a top scorer
db.collection("teams")
  .where("topScorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  .get()
  .then((data) => {
    output = "<ul>";
    data.forEach((doc) => {
      team = doc.data();
      output += `<li>${team.teamName}</li>`;
    });
    output += "</ul>";
    r_e("t2q9").innerHTML = output;
  });

// Task 3 - Updating Data

// a - Existing data

db.collection("teams")
  .where("teamName", "in", ["Real Madrid", "Barcelona"])
  .get()
  .then((data) => {
    data.forEach((doc) => {
      let team = doc.data();
      if (team.teamName === "Real Madrid") {
        db.collection("teams")
          .doc(doc.id)
          .update({
            teamName: "Real Madrid FC",
            fans: 811,
            topScorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
          })
          .then(() => {
            db.collection("teams")
              .doc(doc.id)
              .update({
                topScorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
              });
          });
      } else if (team.teamName === "Barcelona") {
        db.collection("teams")
          .doc(doc.id)
          .update({
            teamName: "FC Barcelona",
            fans: 747,
            topScorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
          })
          .then(() => {
            db.collection("teams")
              .doc(doc.id)
              .update({
                topScorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
              });
          });
      }
    });
  });

// b - New fields

db.collection("teams")
  .where("teamName", "in", ["Real Madrid", "Barcelona"])
  .get()
  .then((data) => {
    data.forEach((doc) => {
      let team = doc.data();
      if (team.teamName === "Real Madrid") {
        db.collection("teams")
          .doc(doc.id)
          .update({
            color: {
              home: "White",
              away: "Black",
            },
          });
      } else if (team.teamName === "Barcelona") {
        db.collection("teams")
          .doc(doc.id)
          .update({
            color: {
              home: "Red",
              away: "Gold",
            },
          });
      }
    });
  });

db.collection("teams")
  .where("teamName", "in", ["Real Madrid", "Barcelona"])
  .get()
  .then((data) => {
    data.forEach((doc) => {
      let team = doc.data();
      if (team.teamName === "Real Madrid") {
        db.collection("teams").doc(doc.id).update({
          "color.away": "Purple",
        });
      } else if (team.teamName === "Barcelona") {
        db.collection("teams").doc(doc.id).update({
          "color.away": "Pink",
        });
      }
    });
  });
