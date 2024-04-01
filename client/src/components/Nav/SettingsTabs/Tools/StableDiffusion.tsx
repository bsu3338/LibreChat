import { useRecoilState } from 'recoil';
import * as Tabs from '@radix-ui/react-tabs';
import React, { useCallback, useRef } from 'react';
import {
  useLocalize,
  useLocalStorage,
} from '~/hooks';
import { Dropdown } from '~/components/ui';
import store from '~/store';

export const SDProfileSelector = ({
  langcode,
  onChange,
}: {
  langcode: string;
  onChange: (value: string) => void;
}) => {
  const localize = useLocalize();

  // Create an array of options for the Dropdown
  const languageOptions = [
    { value: 'auto', display: 'SDXL 1.5' },
    { value: 'en-US', display: 'SDXL Turbo' },
  ];

  return (
    <div className="flex items-center justify-between">
      <div> Stable Diffusion Profile </div>
      <Dropdown value={langcode} onChange={onChange} options={languageOptions} />
    </div>
  );
};

export default function StableDiffusion() {
  const [langcode, setLangcode] = useRecoilState(store.lang);
  const [selectedLang, setSelectedLang] = useLocalStorage('selectedLang', langcode);

  const contentRef = useRef(null);

  const changeLang = useCallback(
    (value: string) => {
      setSelectedLang(value);
      if (value === 'auto') {
        const userLang = navigator.language || navigator.languages[0];
        setLangcode(userLang);
        localStorage.setItem('lang', userLang);
      } else {
        setLangcode(value);
        localStorage.setItem('lang', value);
      }
    },
    [setLangcode, setSelectedLang],
  );

  return (
      <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-50">
        <div className="border-b pb-3 last-of-type:border-b-0 dark:border-gray-700">
          <SDProfileSelector langcode={selectedLang} onChange={changeLang} />
        </div>
      </div>
  );
}
