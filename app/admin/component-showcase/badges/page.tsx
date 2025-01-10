import React from 'react'

import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import InfoBadge from '@/components/_Atoms/badges/info-badge'
import BooleanBadge from '@/components/_Atoms/badges/boolean-badge'
import DateBadge from '@/components/_Atoms/badges/date-badge'
import LinkBadge from '@/components/_Atoms/badges/link-badge'
import NumberBadge from '@/components/_Atoms/badges/number-badge'
import RefBadge from '@/components/_Atoms/badges/ref-badge'
import TimeBadge from '@/components/_Atoms/badges/time-badge'
import DistanceBadge from '@/components/_Atoms/badges/distance-badge'
import Divider from '@/components/_Atoms/boxes/divider'
import OnlineIndicator from '@/components/_Atoms/badges/online-indicator'
import ResponsiveTooltip from '@/components/_Atoms/badges/responsive-tooltip'
import ShortcutTooltip from '@/components/_Atoms/badges/shortcut-tooltip'

export default function BadgesShowcasePage() {
  return (
    <div className="flex flex-row gap-6">
      <CardWithHeader cardSubHeader="Badges showcase">
        <Divider text="Info Badge" />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col space-y-2">
            <InfoBadge
              description="This is a description"
              label="withIcon=false"
              withIcon={false}
            />
            <InfoBadge
              description="This is a description"
              label="Info badge"
              color="info"
            />
            <InfoBadge
              description="This is a description"
              label="Info badge"
              color="destructive"
            />
            <InfoBadge
              description="This is a description"
              label="Info badge"
              color="success"
            />
            <InfoBadge
              description="This is a description"
              label="Info badge"
              color="warning"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <InfoBadge
              description="This is a description"
              color="info"
            />
            <InfoBadge
              description="This is a description"
              color="destructive"
            />
            <InfoBadge
              description="This is a description"
              color="success"
            />
            <InfoBadge
              description="This is a description"
              color="warning"
            />
          </div>
        </div>

        <Divider text="Online Indicator" />
        <OnlineIndicator isOnline={true} />
        <OnlineIndicator isOnline={false} />
        <OnlineIndicator
          isOnline={true}
          onlineText="Custom Text"
        />

        <Divider text="Data Badges" />

        <BooleanBadge value={true} />
        <BooleanBadge value={false} />
        <BooleanBadge value={undefined} />

        <DateBadge value={new Date()} />

        <LinkBadge
          value="https://www.google.com"
          showText="Google"
          type="external"
        />
        <LinkBadge
          value="https://www.google.com"
          type="external"
        />
        <LinkBadge
          value="/admin/showcase"
          showText="Panel admin"
          type="internal"
        />
        <LinkBadge
          value="/admin/showcase"
          type="internal"
        />
        <LinkBadge
          value="kiyameh@gmail.com"
          showText="Email"
          type="email"
        />
        <LinkBadge
          value="kiyameh@gmail.com"
          type="email"
        />
        <LinkBadge
          value="123456789"
          showText="Phone"
          type="phone"
        />
        <LinkBadge
          value="123456789"
          type="phone"
        />
        <NumberBadge
          value={123}
          units="kg"
        />
        <RefBadge
          value={{name: 'Cavidad', _id: '1'}}
          baseUrl="/cave/"
          type="cave"
        />
        <RefBadge
          value={{name: 'Sistema', _id: '1'}}
          baseUrl="/system/"
          type="system"
        />
        <RefBadge
          value={{name: 'Exploración', _id: '1'}}
          baseUrl="/exploration/"
          type="exploration"
        />
        <RefBadge
          value={{name: 'Grupo', _id: '1'}}
          baseUrl="/group/"
          type="group"
        />
        <TimeBadge valueInSeconds={3600} />
        <DistanceBadge valueInMeters={1000} />
        <Divider text="Tooltips" />

        <ResponsiveTooltip content="This is a responsive tooltip">
          <div className="h-8 w-32 rounded-lg bg-muted flex items-center justify-center cursor-help ">
            Hover or tap me
          </div>
        </ResponsiveTooltip>
        <ResponsiveTooltip
          color="destructive"
          content="This is a responsive tooltip"
        >
          <div className="h-8 w-32 rounded-lg bg-muted flex items-center justify-center cursor-help ">
            Hover or tap me
          </div>
        </ResponsiveTooltip>
        <ResponsiveTooltip
          color="warning"
          content="This is a responsive tooltip"
        >
          <div className="h-8 w-32 rounded-lg bg-muted flex items-center justify-center cursor-help ">
            Hover or tap me
          </div>
        </ResponsiveTooltip>
        <ResponsiveTooltip
          color="success"
          content="This is a responsive tooltip"
        >
          <div className="h-8 w-32 rounded-lg bg-muted flex items-center justify-center cursor-help ">
            Hover or tap me
          </div>
        </ResponsiveTooltip>

        <ShortcutTooltip shortcut="Crtl+Shift+P">
          <div className="h-8 w-32 rounded-lg bg-muted flex items-center justify-center cursor-help">
            Shortcut tooltip
          </div>
        </ShortcutTooltip>
      </CardWithHeader>
    </div>
  )
}
