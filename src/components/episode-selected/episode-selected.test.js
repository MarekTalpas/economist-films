// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import EpisodeSelected from './episode-selected';

jest.mock('./parts/episode-description', () =>
  jest.fn(() => <div>EpisodeDescription</div>),
);

jest.mock('../video-player-container/parts/video-player', () =>
  jest.fn(() => <div>VideoPlayer</div>),
);

function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.code = type;
  const episodeSelected: Object = wrapper.instance();
  episodeSelected.handleKeyPress(event);
}
function connectEvent2(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.which = type;
  const episodeSelected: Object = wrapper.instance();
  episodeSelected.handleKeyPress(event);
}

describe('HomeContainer ', () => {
  test('renders with data', () => {
    const tree : string = renderer.create(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      hideSidebarFunction={() => {}}
      isShown
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('handles keyboard events when homeContainer is selected', () => {
    const mockhideSidebarFunction = jest.fn();
    const episodeSelected = mount(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      hideSidebarFunction={mockhideSidebarFunction}
      isShown
    />);
    const event = new Event('keyDown');
    // when home container is selected there are 2 buttons
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'Shift', episodeSelected);
    connectEvent(event, 'ArrowDown', episodeSelected);
    connectEvent(event, 'ArrowRight', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(1);
    connectEvent(event, 'ArrowRight', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(1);
    connectEvent(event, 'Enter', episodeSelected);
    expect(mockhideSidebarFunction.mock.calls.length).toEqual(0);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    connectEvent(event, 'Enter', episodeSelected);
    expect(mockhideSidebarFunction.mock.calls.length).toEqual(1);
    connectEvent(event, 'ArrowUp', episodeSelected);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowRight', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
    // when home container is unselected and there is just 1 button
    episodeSelected.setState({ isSelectedHomeContainer: false });
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowRight', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
  });
  test('handles keyboard events when homeContainer is selected for WEBOS TV', () => {
    const mockhideSidebarFunction = jest.fn();
    const episodeSelected = mount(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      hideSidebarFunction={mockhideSidebarFunction}
      isShown
    />);
    const event = new Event('keyDown');
    // when home container is selected there are 2 buttons
    connectEvent2(event, 6, episodeSelected);
    connectEvent2(event, 40, episodeSelected);
    connectEvent2(event, 39, episodeSelected);
    connectEvent2(event, 37, episodeSelected);
    connectEvent2(event, 38, episodeSelected);
    connectEvent2(event, 13, episodeSelected);
  });
  test('handles keyboard events when homeContainer is unselected', () => {
    const episodeSelected = mount(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer={false}
      hideSidebarFunction={() => {}}
      isShown
    />);
    const event = new Event('keyDown');
    // when home container is unselected there is just 1 button
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    connectEvent(event, 'ArrowUp', episodeSelected);
    connectEvent(event, 'ArrowRight', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
  });
  test('handles keyboard events without closePopupFunction', () => {
    const episodeSelected = mount(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      closePopupFunction={() => {}}
      hideSidebarFunction={() => {}}
      isShown
    />);
    const event = new Event('keyDown');
    // when home container is unselected and there is just 1 button
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowUp', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
  });
  test('mounts/unmounts', () => {
    const wrapper = shallow(<EpisodeSelected
      id={3}
      url="url xyz"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl=""
      seriesId={7}
      isSelectedHomeContainer
      hideSidebarFunction={() => {}}
      isShown
    />);
    wrapper.unmount();
  });
  test('hides buttons', () => {
    const tree : string = renderer.create(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      hideSidebarFunction={() => {}}
      hideButtons={false}
      isShown
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
