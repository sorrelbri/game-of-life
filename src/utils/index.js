const token = process.env.GITHUB_API_TOKEN;

const query = (user) => `query {
  user (login: "${user}") {
		contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
          }
        }
      }
    }
  }	
	
}`;

const options = (user) => ({
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  },
  body: JSON.stringify({
    query: query(user),
  }),
});

const getCalendar = (user) => {
  return fetch(`https://api.github.com/graphql`, options(user))
    .then((res) => res.json())
    .then(
      (result) =>
        result.data.user.contributionsCollection.contributionCalendar.weeks
    )
    .catch((e) => e);
};

class Stream {
  constructor(head, next) {
    this.head = head;
    this.tail = next;
    this.memo = false;
  }
  get next() {
    if (!this.memo) {
      this.tail = this.tail();
      this.memo = true;
    }
    return this.tail;
  }
}

const getNeighbors = (key) => {
  const [x, y] = key.split(",").map((str) => parseInt(str));
  return [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ].map((arr) => arr.join(","));
};

module.exports = {
  Stream,
  getNeighbors,
  getCalendar,
};
