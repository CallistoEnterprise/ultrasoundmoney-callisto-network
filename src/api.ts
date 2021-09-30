import useSWR from "swr";
import config from "./config";
import { milisFromSeconds } from "./duration";
import { LeaderboardEntry } from "./components/BurnLeaderboard";

export const famBasePath =
  config.apiEnv === "staging"
    ? "https://api-stag.ultrasound.money/fam"
    : config.apiEnv === "dev"
    ? "http://localhost:8080/fam"
    : "https://api.ultrasound.money/fam";

export const feesBasePath =
  config.apiEnv === "staging"
    ? "https://api-stag.ultrasound.money/fees"
    : config.apiEnv === "dev"
    ? "http://localhost:8080/fees"
    : "https://api.ultrasound.money/fees";

type WeiPerMinute = number;
type Wei = number;

export type BurnRates = {
  burnRate5m: WeiPerMinute;
  burnRate1h: WeiPerMinute;
  burnRate24h: WeiPerMinute;
  burnRate30d: WeiPerMinute;
  burnRate7d: WeiPerMinute;
  burnRateAll: WeiPerMinute;
};

export type FeesBurned = {
  feesBurned5m: Wei;
  feesBurned1h: Wei;
  feesBurned24h: Wei;
  feesBurned7d: Wei;
  feesBurned30d: Wei;
  feesBurnedAll: Wei;
};

export type Leaderboards = {
  leaderboard1h: LeaderboardEntry[];
  leaderboard24h: LeaderboardEntry[];
  leaderboard7d: LeaderboardEntry[];
  leaderboard30d: LeaderboardEntry[];
  leaderboardAll: LeaderboardEntry[];
};

export type FeeData = {
  baseFeePerGas: number | undefined;
  burnRates: BurnRates | undefined;
  latestBlockFees: {
    fees: Wei;
    number: number;
    baseFeePerGas: Wei;
  }[];
  number: number | undefined;
  feesBurned: FeesBurned | undefined;
  leaderboards: Leaderboards | undefined;
};

export const useFeeData = (): FeeData => {
  const { data } = useSWR(`${feesBasePath}/all`, {
    refreshInterval: milisFromSeconds(4),
  });

  return data !== undefined
    ? {
        baseFeePerGas: data.baseFeePerGas,
        burnRates: data.burnRates,
        latestBlockFees: data.latestBlockFees,
        number: data.number,
        feesBurned: data.feesBurned,
        leaderboards: data.leaderboards,
      }
    : {
        baseFeePerGas: undefined,
        burnRates: undefined,
        latestBlockFees: [],
        number: undefined,
        feesBurned: undefined,
        leaderboards: undefined,
      };
};

export const setContractTwitterHandle = async (
  token: string,
  address: string,
  handle: string
) => {
  const res = await fetch(
    `${feesBasePath}/set-contract-twitter-handle?address=${address}&token=${token}&handle=${handle}`
  );

  if (res.status !== 200) {
    console.error("failed to add twitter handle");
    return;
  }

  console.log(`successfully added twitter handle ${handle} for ${address}`);
};

export const setContractName = async (
  token: string,
  address: string,
  name: string
) => {
  const res = await fetch(
    `${feesBasePath}/set-contract-name?address=${address}&token=${token}&name=${name}`
  );

  if (res.status !== 200) {
    console.error("failed to add contract name");
    return;
  }

  console.log(`successfully added contract name ${name} for ${address}`);
};

export const setContractCategory = async (
  token: string,
  address: string,
  category: string
) => {
  const res = await fetch(
    `${feesBasePath}/set-contract-category?address=${address}&token=${token}&category=${category}`
  );

  if (res.status !== 200) {
    console.error("failed to add contract category");
    return;
  }

  console.log(
    `successfully added contract category ${category} for ${address}`
  );
};

export type EthPrice = {
  usd: number;
  usd24hChange: number;
  btc: number;
  btc24hChange: number;
};

export const useEthPrices = () => {
  const { data } = useSWR<EthPrice>(`${feesBasePath}/eth-price`, {
    refreshInterval: milisFromSeconds(4),
  });

  return data !== undefined ? { ethPrices: data } : { ethPrices: undefined };
};