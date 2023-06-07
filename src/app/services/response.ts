import iconMap from '../pages/home/iconMap';

interface MeausringUnit {
  Value: number;
  Unit: 'C' | 'F';
  UnitType: number;
}

interface DayPortion {
  Icon: keyof typeof iconMap;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: MeausringUnit;
    Maximum: MeausringUnit;
  };
  Day: DayPortion;
  Night: DayPortion;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface CurrentWeather {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: keyof typeof iconMap;
  HasPrecipitation: boolean;
  PrecipitationType: null | string;
  IsDayTime: boolean;
  Temperature: {
    Metric: MeausringUnit;
    Imperial: MeausringUnit;
  };
  MobileLink: string;
  Link: string;
}

export interface FiveDayForecast {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number; //todo 0-7
    Text: string;
    Category: string;
    EndDate: string | null;
    EndEpochDate: string | null;
    MobileLink: string;
    Link: string;
  };
  DailyForecasts: DailyForecast[];
}
