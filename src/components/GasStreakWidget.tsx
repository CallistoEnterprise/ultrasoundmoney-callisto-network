import { formatDistanceStrict, parseISO } from "date-fns";
import type { FC } from "react";
import CountUp from "react-countup";
import {
  decodeGroupedAnalysis1,
  useGroupedAnalysis1,
} from "../api/grouped-analysis-1";
import type { DateTimeString } from "../time";
import { LabelUnitText } from "./Texts";
import LabelText from "./TextsNext/LabelText";
import QuantifyText from "./TextsNext/QuantifyText";
import SkeletonText from "./TextsNext/SkeletonText";
import UltraSoundBarrier from "./UltraSoundBarrier";
import { WidgetBackground, WidgetTitle } from "./WidgetSubcomponents";
import _last from "lodash/last";

type SpanningAgeProps = {
  isLoading: boolean;
  lastBlockTimestamp: DateTimeString | undefined;
  startedOn: DateTimeString | undefined;
};

const SpanningAge: FC<SpanningAgeProps> = ({
  isLoading,
  lastBlockTimestamp,
  startedOn,
}) => {
  const formattedDistance =
    startedOn === undefined || lastBlockTimestamp === undefined
      ? undefined
      : formatDistanceStrict(parseISO(startedOn), parseISO(lastBlockTimestamp));
  const formattedNumber =
    formattedDistance === undefined
      ? 0
      : Number(formattedDistance.split(" ")[0]);
  const formattedUnit = formattedDistance?.split(" ")[1];

  return (
    <div className="flex items-baseline gap-x-1 truncate">
      <QuantifyText size="text-4xl">
        <SkeletonText width="2rem">
          {isLoading ? undefined : (
            <CountUp preserveValue end={formattedNumber} />
          )}
        </SkeletonText>
      </QuantifyText>
      <QuantifyText color="text-slateus-200" className="ml-1" size="text-4xl">
        <SkeletonText width="8rem">
          {isLoading ? undefined : formattedUnit ?? "seconds"}
        </SkeletonText>
      </QuantifyText>
    </div>
  );
};

const GasStreakWidget: FC = () => {
  const groupedAnalysis1F = useGroupedAnalysis1();
  const groupedAnalysis1 = decodeGroupedAnalysis1(groupedAnalysis1F);
  const lastBaseFeeAtTime = _last(groupedAnalysis1?.latestBlockFees)?.minedAt;

  const deflationaryStreak = groupedAnalysis1?.deflationaryStreak.postMerge;

  return (
    <WidgetBackground>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <WidgetTitle>gas streak</WidgetTitle>
        </div>
        <span className="font-inter text-xs font-extralight text-blue-spindle md:text-sm">
          <SpanningAge
            isLoading={deflationaryStreak === undefined}
            startedOn={deflationaryStreak?.startedOn ?? undefined}
            lastBlockTimestamp={lastBaseFeeAtTime}
          />
        </span>
        <div className="flex items-center gap-x-1">
          <LabelUnitText className="mt-1">
            <SkeletonText width="3rem">
              {deflationaryStreak === undefined
                ? undefined
                : deflationaryStreak?.count ?? 0}
            </SkeletonText>
          </LabelUnitText>
          <LabelText className="mt-1">
            {deflationaryStreak?.count === 1 ? " block" : " blocks"}
          </LabelText>
          <LabelText className="mt-1" color="text-slateus-400">
            above
          </LabelText>
          <UltraSoundBarrier />
        </div>
      </div>
    </WidgetBackground>
  );
};

export default GasStreakWidget;
