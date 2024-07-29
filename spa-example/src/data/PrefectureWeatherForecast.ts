/**
 * 都道府県天気予報
 */
export interface PrefectureWeatherForecast {
    /**
     * 発表気象台
     */
    publishingOffice:string;
    /**
     * 発表日時
     */
    reportDatetime: string;
    /**
     * 対象エリア
     */
    targetArea: string;
    /**
     * ヘッドライン
     */
    headlineText: string;
    /**
     * 本文
     */
    text: string;
}