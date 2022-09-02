import useSWR from "swr";
import * as Duration from "../duration";
import type { TimeFrameNext } from "../time-frames";
import { fetchJson } from "./fetchers";

export type AverageEthPrice = Record<TimeFrameNext, number>;

export const useAverageEthPrice = (): AverageEthPrice | undefined => {
  const { data } = useSWR<AverageEthPrice>(
    "/api/fees/average-eth-price",
    fetchJson,
    {
      refreshInterval: Duration.millisFromSeconds(8),
    },
  );

  return data === undefined ? undefined : data;
};