// import { ClickEventValue, mapClickEventValueToLabel } from '@/constant/ga';

export const GA_TRACKING_ID = 'G-M785SB2XE3';

declare global {
  interface Window {
    gtag: any;
  }
}

export const trackPageView = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

type EventProps = {
  action: string;
  category: string;
  label: string;
  value: string;
};

const event = ({ action, category, label, value }: EventProps) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackClickEvent = (value: string) => {
  event({
    action: 'click',
    category: 'click',
    label: '',
    value: value,
  });
};
