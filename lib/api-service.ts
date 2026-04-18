import { fetcher } from "./services";

export const getServices = () => fetcher("/api/services");
export const getHero = () => fetcher("/api/hero");
export const getAbout = () => fetcher("/api/about");
export const getPortfolio = () => fetcher("/api/portfolios");