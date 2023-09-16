export interface AccessTokenModel {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface PlaylistRoot {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: any;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: any;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Tracks {
  href: string;
  items: YoutubeSearchResultItem[];
  limit: number;
  next: any;
  offset: number;
  previous: any;
  total: number;
}

export interface YoutubeSearchResultItem {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  primary_color: any;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export interface AddedBy {
  external_urls: ExternalUrls3;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ExternalUrls3 {
  spotify: string;
}

export interface Track {
  album: Album;
  artists: Artist2[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls7;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url?: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls5;
  href: string;
  id: string;
  images: Image2[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls4;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls4 {
  spotify: string;
}

export interface ExternalUrls5 {
  spotify: string;
}

export interface Image2 {
  height: number;
  url: string;
  width: number;
}

export interface Artist2 {
  external_urls: ExternalUrls6;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls6 {
  spotify: string;
}

export interface ExternalIds {
  isrc: string;
}

export interface ExternalUrls7 {
  spotify: string;
}

export interface VideoThumbnail {
  url: any;
}

export interface YoutubeSearchResult {
  items: YoutubeSearchResultItem[];
  nextPage: NextPage;
}

export interface YoutubeSearchResultItem {
  id: string;
  type: string;
  thumbnail: Thumbnail;
  title: string;
  channelTitle: string;
  shortBylineText: ShortBylineText;
  isLive: boolean;
}

export interface Thumbnail {
  thumbnails: Thumbnail2[];
}

export interface Thumbnail2 {
  url: string;
  width: number;
  height: number;
}

export interface ShortBylineText {
  runs: Run[];
}

export interface Run {
  text: string;
  navigationEndpoint: NavigationEndpoint;
}

export interface NavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata;
  browseEndpoint: BrowseEndpoint;
}

export interface CommandMetadata {
  webCommandMetadata: WebCommandMetadata;
}

export interface WebCommandMetadata {
  url: string;
  webPageType: string;
  rootVe: number;
  apiUrl: string;
}

export interface BrowseEndpoint {
  browseId: string;
  canonicalBaseUrl: string;
}

export interface NextPage {
  nextPageToken: string;
  nextPageContext: NextPageContext;
}

export interface NextPageContext {
  context: Context;
  continuation: string;
}

export interface Context {
  client: Client;
  user: User;
  request: Request;
  clickTracking: ClickTracking;
}

export interface Client {
  hl: string;
  gl: string;
  remoteHost: string;
  deviceMake: string;
  deviceModel: string;
  visitorData: string;
  userAgent: string;
  clientName: string;
  clientVersion: string;
  osVersion: string;
  originalUrl: string;
  platform: string;
  clientFormFactor: string;
  configInfo: ConfigInfo;
  acceptHeader: string;
  deviceExperimentId: string;
}

export interface ConfigInfo {
  appInstallData: string;
}

export interface User {
  lockedSafetyMode: boolean;
}

export interface Request {
  useSsl: boolean;
}

export interface ClickTracking {
  clickTrackingParams: string;
}
