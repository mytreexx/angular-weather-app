import iconMap from '../pages/home/iconMap';

interface MeausringUnit {
  Value: number;
  UnitType: number;
}

interface TemperatureUnit extends MeausringUnit {
  Unit: 'C' | 'F';
}

interface DistanceUnit extends MeausringUnit {
  Unit: 'm' | 'ft';
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
    Minimum: TemperatureUnit;
    Maximum: TemperatureUnit;
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
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
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

interface AreaIdAndCode {
  ID: string;
  LocalizedName: string;
}

interface AreaEnglish extends AreaIdAndCode {
  EnglishName: string;
}

export interface LocationDetails {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: AreaIdAndCode;
  AdministrativeArea: AreaIdAndCode;
}

export interface Geoposition extends LocationDetails {
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: AreaEnglish;
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  };
  TimeZone: {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: string;
  };
  GeoPosition: {
    Latitude: number;
    Longitude: number;
    Elevation: {
      Metric: DistanceUnit;
      Imperial: DistanceUnit;
    };
  };
  IsAlias: false;
  ParentCity: {
    Key: string;
    LocalizedName: string;
    EnglishName: string;
  };
  SupplementalAdminAreas: [];
  DataSets: string[];
}
