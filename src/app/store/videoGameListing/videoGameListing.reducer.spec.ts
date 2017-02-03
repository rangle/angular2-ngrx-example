import {createAction} from '../createAction';
import videoGameListingReducer from './videoGameListing.reducer';
import {createDefaultVideoGameListing} from '../../interfaces/videoGameListing/videoGameListing.interface';
import {VideoGameListingStore} from './videoGameListing.store';
import {createVideoGame} from '../../interfaces/videoGame/videoGame.interface';

describe('videoGameListingReducer(falsy, unknownAction)', () => {
  const unknownAction = createAction('UNKNOWN');

  it('returns the default state', () => {
    const videoGameListing = videoGameListingReducer(null, unknownAction);
    expect(videoGameListing).toEqual(createDefaultVideoGameListing());
  });
});

describe('videoGameListingReducer(videoGameListing, retrieveAction)', () => {
  const videoGameListing = Object.assign(
    {}, createDefaultVideoGameListing(), { loadingError: 'Error' }
  );
  const retrieveAction = createAction(VideoGameListingStore.RETRIEVE);

  it('sets isLoading to true', () => {
    const newVideoGameListing = videoGameListingReducer(videoGameListing, retrieveAction);
    expect(newVideoGameListing.isLoading).toEqual(true);
  });

  it('clears out existing errors', () => {
    const newVideoGameListing = videoGameListingReducer(videoGameListing, retrieveAction);
    expect(newVideoGameListing.loadingError).toBeNull();
  });
});

describe('videoGameListingReducer(videoGameListing, retrieveSuccessAction)', () => {
  const videoGameListing = Object.assign({}, createDefaultVideoGameListing(), {
    isLoading: true
  });
  const retrieveSuccessAction = createAction(VideoGameListingStore.RETRIEVE_SUCCESS, {
    videoGames: [createVideoGame('1', 'Super Mario')]
  });

  it('set the videoGameListing list', () => {
    const newVideoGameListing = videoGameListingReducer(videoGameListing, retrieveSuccessAction);
    expect(newVideoGameListing.videoGames).toEqual([createVideoGame('1', 'Super Mario')]);
  });

  it('should set isLoading to false', () => {
    const newVideoGameListing = videoGameListingReducer(videoGameListing, retrieveSuccessAction);
    expect(newVideoGameListing.isLoading).toEqual(false);
  });
});

describe('videoGameListingReducer(videoGameListing, retrieveErrorAction)', () => {
  const videoGameListing = Object.assign({}, createDefaultVideoGameListing(), {
    isLoading: true
  });
  const retrieveErrorAction = createAction(VideoGameListingStore.RETRIEVE_ERROR, {
    error: 'Error Message'
  });

  it('set the loading error', () => {
    const newVideoGameListing = videoGameListingReducer(videoGameListing, retrieveErrorAction);
    expect(newVideoGameListing.loadingError).toEqual('Error Message');
  });

  it('should set isLoading to false', () => {
    const newVideoGameListing = videoGameListingReducer(videoGameListing, retrieveErrorAction);
    expect(newVideoGameListing.isLoading).toEqual(false);
  });
});

describe('videoGameListingReducer(videoGameListing, searchAction)', () => {
  const videoGameListing = createDefaultVideoGameListing();
  const searchAction = createAction(VideoGameListingStore.SEARCH, {
    query: 'Super'
  });

  it('set the search query', () => {
    const newVideoGameListing = videoGameListingReducer(videoGameListing, searchAction);
    expect(newVideoGameListing.searchQuery).toEqual('Super');
  });
});

describe('videoGameListingReducer(videoGameListing, filterPlatformAction)', () => {
  const videoGameListing = createDefaultVideoGameListing();
  const filterPlatformAction = createAction(VideoGameListingStore.FILTER_PLATFORM, {
    platform: 'Nintendo Switch'
  });

  it('set the search query', () => {
    const newVideoGameListing = videoGameListingReducer(videoGameListing, filterPlatformAction);
    expect(newVideoGameListing.filters.platform).toEqual('Nintendo Switch');
  });
});
