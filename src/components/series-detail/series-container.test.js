// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as fetches from '../../api/fetch';
import SeriesContainer from './series-container';

const mockData = {
  title: 't1',
  description: 'aaa',
  additional_assets: [
    {
      file: {
        url: 'xxx',
      },
    },
    {
      file: {
        url: 'yyy',
      },
    },
    {
      file: {
        url: 'zzz',
      },
    },
  ],
  published_episodes: [
    {
      id: 3,
      eries_id: 3,
      thumbnail: {
        url: 'th1',
      },
      itle: 't2',
      ubtitle: 'st1',
      escription: 'd1',
      ideo_url: 'vu1',
    },
  ],
};
const dummySliderItems = {
  published_episodes: [
    {
      id: 119,
      title: 'Saving Corals',
      thumbnail: {
        url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/119/episode_875X480.jpg',
      },
      type: 'Episode',
    },
    {
      id: 141,
      title: 'The deep ocean is the final frontier on planet Earth',
      thumbnail: {
        url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg',
      },
      type: 'Episode',
    },
  ],
};

describe('SeriesContainer', () => {
  jest.mock('../side-panel/side-panel', () =>
    jest.fn(() => <div>Side Panel</div>),
  );
  jest.mock('../episode-selected/episode-selected', () =>
    jest.fn(() => <div>Episode selected</div>),
  );
  test('renders correctly', () => {
    const tree : string = renderer.create(
      <SeriesContainer
        series={mockData}
        params={{ id: 50 }}
        location={{
          query: {
            expandedEpisode: '100',
          },
        }}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Series detail navigation works', () => {
    const seriesContainer = mount(
      <SeriesContainer
        series={mockData}
        params={{ id: 50 }}
        location={{
          query: {
            expandedEpisode: '',
          },
        }}
      />);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
  });
  function connectEvent(event, type, wrapper) {
    const changedEvent: Object = event;
    changedEvent.code = type;
    const seriesContainer: Object = wrapper.instance();
    seriesContainer.handleKeyPress(event);
  }
  test('Series detail navigation works', () => {
    const seriesContainer = mount(
      <SeriesContainer
        series={mockData}
        params={{ id: 50 }}
        location={{
          query: {
            expandedEpisode: '119',
          },
        }}
      />);
    const event = new Event('keyDown');
    seriesContainer.setState({ series: dummySliderItems });
    expect(seriesContainer.state().isSliderSelected).toEqual(true);
    expect(seriesContainer.state().isSideBarSelected).toEqual(false);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(true);
    // [0,0]
    connectEvent(event, 'ArrowRight', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    // [0,0]
    connectEvent(event, 'ArrowLeft', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    // sidePanel is selected
    connectEvent(event, 'ArrowLeft', seriesContainer);
    expect(seriesContainer.state().isSliderSelected).toEqual(false);
    expect(seriesContainer.state().isSideBarSelected).toEqual(true);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
    connectEvent(event, 'Enter', seriesContainer);
    seriesContainer.setState({ goToEpisodeDetail: false });
    // slider is selected
    connectEvent(event, 'ArrowRight', seriesContainer);
    expect(seriesContainer.state().isSliderSelected).toEqual(true);
    expect(seriesContainer.state().isSideBarSelected).toEqual(false);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    // show pop up
    connectEvent(event, 'Enter', seriesContainer);
    seriesContainer.setState({ goToEpisodeDetail: false });
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
    connectEvent(event, 'ArrowRight', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(1);
    connectEvent(event, 'ArrowRight', seriesContainer);
    connectEvent(event, 'ArrowLeft', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    connectEvent(event, 'Backspace', seriesContainer);
    jest.fn(() => {});
    connectEvent(event, 'Space', seriesContainer);
    const seriesContainerInstance: Object = seriesContainer.instance();
    seriesContainerInstance.handleReturnFromEpisode();
    seriesContainer.unmount();
  });
  test('Series fetch', () => {
    // $FlowFixMe
    fetches.getSeriesByID =
      jest.fn().mockImplementation(() => new Promise(resolve => resolve(dummySliderItems)));
    mount(
      <SeriesContainer
        series={mockData}
        params={{ id: 50 }}
        location={{
          query: {
            expandedEpisode: '141',
          },
        }}
      />);
    // $FlowFixMe
    expect(fetches.getSeriesByID.mock.calls.length).toEqual(1);
    mount(
      <SeriesContainer
        series={mockData}
        params={{ id: 50 }}
        location={{
          query: {
            expandedEpisode: '1415',
          },
        }}
      />);
    // $FlowFixMe
    expect(fetches.getSeriesByID.mock.calls.length).toEqual(2);
  });
});
