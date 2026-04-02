import { GoogleGenAI, Type } from "@google/genai";

// AI Studio 환경에서는 process.env.GEMINI_API_KEY를 통해 자동으로 키가 주입됩니다.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface HealthData {
  name: string;
  age: number;
  bloodPressure: string[];
  bloodGlucose: string[];
  notes?: string;
}

/**
 * 어르신의 건강 데이터를 분석하여 맞춤형 요약을 생성합니다.
 */
export async function generateHealthSummary(data: HealthData): Promise<string> {
  try {
    const prompt = `
      어르신 성함: ${data.name} (${data.age}세)
      최근 혈압 기록: ${data.bloodPressure.join(", ")}
      최근 혈당 기록: ${data.bloodGlucose.join(", ")}
      특이사항: ${data.notes || "없음"}

      위 데이터를 바탕으로 요양 보호사가 참고할 수 있는 2~3문장 내외의 따뜻하고 전문적인 건강 요약을 작성해줘. 
      주의가 필요한 수치가 있다면 강조해주고, 구체적인 행동 지침(예: 수분 섭취 권장, 염분 조절 등)을 포함해줘.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "데이터 분석 중 오류가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "현재 AI 분석 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.";
  }
}

/**
 * 시설 전체의 위험군을 예측하고 분석 리포트를 생성합니다.
 */
export async function predictRiskSeniors(seniors: any[]): Promise<string> {
  try {
    const prompt = `
      다음은 시설 내 어르신들의 최근 상태 요약입니다:
      ${JSON.stringify(seniors)}

      이 데이터를 분석하여 가장 주의 깊게 관찰해야 할 어르신 한 분을 선정하고, 
      그 이유와 보호사가 오늘 취해야 할 구체적인 조치를 AI 전문가 입장에서 제안해줘.
      답변은 3문장 정도로 짧고 명확하게 해줘.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "위험군 분석 중 오류가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 분석 엔진이 응답하지 않습니다.";
  }
}

/**
 * 시설 전체 또는 특정 시니어의 통계 데이터를 분석하여 종합 리포트를 생성합니다.
 */
export async function generateStatisticalReport(stats: any): Promise<string> {
  try {
    const prompt = `
      다음은 시설의 최근 통계 데이터 요약입니다:
      - 평균 혈당: ${stats.avgGlucose} mg/dL
      - 평균 혈압: ${stats.avgBP} mmHg
      - 복약 순응도: ${stats.medAdherence}%
      - TODO 달성률: ${stats.todoCompletion}%

      이 데이터를 바탕으로 다음 항목을 포함한 'AI 기반 종합 건강 리포트'를 작성해줘:
      1. 전체적인 건강 추세 분석 (혈압, 혈당 등)
      2. 주의가 필요한 이상 징후 및 위험군 요약
      3. 시설 운영 및 케어 품질 향상을 위한 구체적인 제언
      
      답변은 전문적이면서도 가독성 있게 마크다운 형식으로 작성해줘.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "리포트 생성 중 오류가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 리포트 엔진을 불러올 수 없습니다.";
  }
}
