import {IVideoGameFilters} from '../videoGameListing/videoGameFilters.interface';

export interface IVideoGame {
  id: string;
  title: string;
  platform: string;
  description: string;
  youtubeUrl: string;
}

export function createVideoGame(
  id: string,
  title: string,
  platform?: string,
  description?: string,
  youtubeUrl?: string
) {
  return {id, title, platform, description, youtubeUrl};
}

function textMatchesSearchQuery(text: string, searchQuery: string) {
  return text ?
    text.toLowerCase().includes(searchQuery.toLowerCase()) :
    false;
}

export function videoGameMatchesSearchQuery(videoGame: IVideoGame, searchQuery: string) {
  if (!Boolean(videoGame)) {
    return false;
  }

  return Boolean(searchQuery) ?
    textMatchesSearchQuery(videoGame.title, searchQuery) ||
    textMatchesSearchQuery(videoGame.description, searchQuery) :
    true;
}

export function videoGameMatchesFilters(videoGame: IVideoGame, filters: IVideoGameFilters) {
  if (!Boolean(videoGame)) {
    return false;
  }

  return Boolean(filters) && Boolean(filters.platform) ?
    videoGame.platform === filters.platform :
    true;
}
