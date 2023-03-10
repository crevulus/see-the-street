import { create, StoreApi, UseBoundStore } from "zustand";

import type { User } from "firebase/auth";
// import { PlaceType } from "../components/Search/Search";

type PlaceType = any;

type GeographicStateType = {
  chosenLocation: PlaceType | null;
  setChosenLocation: (place: PlaceType | null) => void;
  mapLoaded: boolean;
  setMapLoaded: (loaded: boolean) => void;
  currentLocation: GeolocationPosition | null;
  setCurrentLocation: (place: GeolocationPosition | null) => void;
};

export const useGeographicStore = create<GeographicStateType>((set) => ({
  chosenLocation: null,
  setChosenLocation: (location: PlaceType | null) =>
    set((state) => ({ ...state, chosenLocation: location })),
  mapLoaded: false,
  setMapLoaded: (loaded: boolean) =>
    set((state) => ({ ...state, mapLoaded: loaded })),
  currentLocation: null,
  setCurrentLocation: (location: GeolocationPosition | null) =>
    set((state) => ({ ...state, currentLocation: location })),
}));

type UserStateType = {
  user: User | null;
  setUser: (userData: User | null) => void;
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
};

export const useUserStore = create<UserStateType>((set) => ({
  user: null,
  setUser: (userData) => set((state) => ({ ...state, user: userData })),
  isSignedIn: false,
  setIsSignedIn: (signedIn) =>
    set((state) => ({ ...state, isSignedIn: signedIn })),
}));

type ErrorStateType = {
  error: boolean;
  errorMessage: string;
  setError: (error: boolean, errorMessage?: string) => void;
};

const defaultErrorMessage = "Oops! Something went wrong.";

export const useErrorStore = create<ErrorStateType>((set) => ({
  error: false,
  errorMessage: defaultErrorMessage,
  setError: (error, errorMessage = defaultErrorMessage) =>
    set((state) => ({ ...state, error, errorMessage })),
}));

export interface TagsType {
  id: number;
  text: string;
}

type SiteDataStoreType = {
  tagsDocData: any;
  setTagsDocData: (tags: any) => void;
};

export const useSiteDataStore = create<SiteDataStoreType>((set) => ({
  tagsDocData: [],
  setTagsDocData: (tags) => set((state) => ({ ...state, tagsDocData: tags })),
}));

export const connectStoreToReduxDevtools = (
  name: string,
  store: UseBoundStore<StoreApi<object>>
) => {
  // @ts-ignore
  const connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
    name: "Form fields",
  });
  connection?.init(store.getState());

  let isUpdateFromDevtools = false;
  connection?.subscribe((evt: any) => {
    if (evt.type === "DISPATCH") {
      const newState = JSON.parse(evt.state);
      isUpdateFromDevtools = true;
      store.setState(newState);
      isUpdateFromDevtools = false;
    }
  });

  return store.subscribe((newState) => {
    if (!isUpdateFromDevtools) {
      connection?.send(name, newState);
    }
  });
};
