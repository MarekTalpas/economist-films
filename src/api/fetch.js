// @flow
function constructFetch(type: string, id: ?number) {
  const urlString = id ? `${type}/${id}` : type;
  return fetch(`
    https://economist.twivel.io/api/v1/${urlString}/json`, {
      method: 'GET',
    })
  .then(response => response.json())
  .catch(err => err);
}

export function getRoot() {
  return constructFetch('root');
}

export function getEpisodeByID(id: number) {
  return constructFetch('episode', id);
}

export function getSeriesByID(id: number) {
  return constructFetch('series', id);
}

export function getRecommendedEpisodes() {
  // const urlString = `http://ec2-52-59-206-213.eu-central-1.compute.amazonaws.com:8080/user/${id}`;
  // return fetch(urlString, {
  //   method: 'GET',
  //   mode: 'no-cors',
  //   headers: new Headers({
  //     'Content-Type': 'text/plain',
  //   }),
  // })
  return fetch(`
    http://ec2-52-59-206-213.eu-central-1.compute.amazonaws.com:8080/user/1`, {
      method: 'GET',
    })
  .then(response => response.json())
  .catch(err => err);
  // .then(response => response)
  // .catch(err => err);
}
