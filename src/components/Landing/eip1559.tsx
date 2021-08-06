import * as React from "react";
import ContentBlock from "../ContentBlock/ContentBlcok";
import EthLogo from "../../assets/ethereum-logo-2014-5.svg";
import { TranslationsContext } from "../../translations-context";

const EIP1559: React.FC<{}> = () => {
  const t = React.useContext(TranslationsContext);
  return (
    <>
      <ContentBlock
        img={EthLogo}
        title={t.landing_eip1559_title}
        text={t.landing_eip1559_text}
        styles="block-fee-burn"
        id="eip-1559"
      />
    </>
  );
};

export default EIP1559;