import type { PrefectureWeatherForecast } from "../../../data/PrefectureWeatherForecast";
import type { PageLoad } from "./$types";


const regex = /^\d{2}$/;

type Data = { prefectureWeatherForecast: PrefectureWeatherForecast | null }

export const load: PageLoad<Data> = async ({ params }) => {

    if (!regex.test(params.prefCode)) {
        throw new Error(`Invalid path`);
    }

    try {
        // 気象庁のjsonファイルを参照します。
        // https://www.jma.go.jp/jma/kishou/info/coment.html
        const response = await fetch(`https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${params.prefCode}0000.json`);

        if (!response.ok) {
            if (response.status == 404) {
                return {
                    prefectureWeatherForecast: null
                }
            }

            throw new Error(`レスポンスステータス: ${response.status}`);
        }

        let json = await response.json();

        return {
            prefectureWeatherForecast: json
        };
    } catch (e) {
        // TODO　エラーハンドリング
        console.error(e);

        return {
            prefectureWeatherForecast: null
        }
    }

}