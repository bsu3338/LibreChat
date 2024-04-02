import { useRecoilState } from 'recoil';
import * as Tabs from '@radix-ui/react-tabs';
import React, { useCallback, useRef } from 'react';
import { useGetStartupConfig } from 'librechat-data-provider/react-query';
import {
  useLocalize,
  useLocalStorage,
} from '~/hooks';
import { Dropdown } from '~/components/ui';
import store from '~/store';

export const SDProfileSelector = ({
  sdprofile,
  onChange,
}: {
  sdprofile: string;
  onChange: (value: string) => void;
}) => {
  const localize = useLocalize();

  // Create an array of options for the Dropdown
  const { data: config } = useGetStartupConfig();
  const sdConfig = config?.tools?.stableDiffusion;

  let sdProfileOptions = [];
  if (sdConfig) {
    sdProfileOptions = sdConfig.map(obj => {
      return {
        value: obj.name,
        display: obj.name
      };
    });
  } else {
    sdProfileOptions = [
      { value: 'Default', display: localize('com_nav_sd_default') },
    ];
  }

  return (
    <div className="flex items-center justify-between">
      <div> {localize('com_nav_sd_profile')} </div>
      <Dropdown value={sdprofile} onChange={onChange} options={sdProfileOptions} />
    </div>
  );
};

export default function StableDiffusion() {
  const [sdprofile, setSDProfile] = useRecoilState(store.sdProfile);
  const [selectedSDProfile, setSelectedSDProfile] = useLocalStorage('selectedSDProfile', sdprofile);

  const contentRef = useRef(null);

  const changeSDProfile = useCallback(
    (value: string) => {
      setSelectedSDProfile(value);
      setSDProfile(value);
      localStorage.setItem('sdProfile', value);
    },
    [setSDProfile, setSelectedSDProfile],
  );

  return (
      <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-50">
        <div className="border-b pb-3 last-of-type:border-b-0 dark:border-gray-700">
          <SDProfileSelector sdprofile={selectedSDProfile} onChange={changeSDProfile} />
        </div>
      </div>
  );
}
