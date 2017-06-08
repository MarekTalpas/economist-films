// @flow

export type VideoProgressType = {
  episodeId: number,
  progressTime: number,
};

export const HISTORY_LIST = 'history';
export const HISTORY_WATCH = 'history_watch';

export function saveVideoProgress(id: number, progress: number) {
  if (typeof (localStorage) !== 'undefined') {
    const currentHistory: ?string = localStorage.getItem(HISTORY_LIST);
    const parsedCurrentHistory = JSON.parse(currentHistory || 'null') || [];
    const indexOfVideo = parsedCurrentHistory.findIndex(element => element.episodeId === id);
    if (indexOfVideo === -1) {
      parsedCurrentHistory.push({
        episodeId: id,
        progressTime: progress,
      });
    } else {
      parsedCurrentHistory[indexOfVideo].progressTime = progress;
    }
    localStorage.setItem(HISTORY_LIST, JSON.stringify(parsedCurrentHistory));
  }
}

export function getProgressTimeById(id: number) {
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  const parsedData = JSON.parse(data || 'null');
  if (parsedData) {
    const requiredEpisode = parsedData.find(episode => episode.episodeId === id);
    return requiredEpisode ? requiredEpisode.progressTime : 0;
  }
  return 0;
}

export function getLastEpisodeID(eIDs: Array<number>) {
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  const parsedData = JSON.parse(data || 'null');
  if (parsedData) {
    const lastEpisode =
      parsedData.reverse().find(histEntry => eIDs.find(id => histEntry.episodeId === id));
    if (lastEpisode) {
      return (lastEpisode.progressTime <= 95) ? lastEpisode.episodeId : `finished-${lastEpisode.episodeId}`;
    }
    return 0;
  }
  return 0;
}
