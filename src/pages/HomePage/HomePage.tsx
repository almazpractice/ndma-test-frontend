import React from "react";
import { useMemo } from "react";
import { Page } from "@/components/Page.tsx";
import { PageHeader } from "@/components/common/PageHeader.tsx";
import { WelcomeSection } from "@/components/common/WelcomeSection.tsx";
import { InfoCard } from "@/components/common/InfoCard.tsx";
import { MastersGrid } from "@/components/common/MastersGrid.tsx";

import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  type User,
  useSignal,
} from "@telegram-apps/sdk-react";
import { masters } from "@/components/common/Master";

function getUserName(user: User): string | undefined {
  return user.first_name ? user.first_name : user.username;
}

export const HomePage: React.FC = () => {
  const initDataState = useSignal(_initDataState);

  const userName = useMemo<string | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserName(initDataState.user)
      : undefined;
  }, [initDataState]);

  return (
    <Page back={false}>
      <div className="bg-white flex flex-col font-sans pagesHeightFix">
        <PageHeader title="NDMA" />
        <WelcomeSection
          name={userName ? userName : "Guest"}
          subtitle="Relax, refresh and rejuvenate with NDMA massage experts."
        />

        <InfoCard
          title={<>📍 Our Location</>}
          description={<>Belgrade, Kneza Mihaila 12</>}
          button={{ label: "View on Map", className: "text-[#ef6c4d]" }}
          className="bg-[#ff7e5f]"
        />

        <InfoCard
          title={<>✨ Recommendations</>}
          description={
            <>
              Try our Elite Rejuvenation Therapy for stress relief and deep
              relaxation.
            </>
          }
          button={{ label: "Learn More", className: "text-[#1f7a31]" }}
          className="bg-[#9eb370]"
        />

        <MastersGrid masters={masters} />
      </div>
    </Page>
  );
};
