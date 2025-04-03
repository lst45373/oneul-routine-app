"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Select, SelectItem } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

const weeklyRoutines = {
  "1주차": [
    {
      title: "PUSH 루틴",
      description: ["해머 숄더프레스", "스미스 인클라인 벤치프레스", "해머 체스트프레스", "팩덱 플라이", "케이블 레터럴 레이즈", "삼두 머신"]
    },
    {
      title: "PULL 루틴",
      description: ["노틸러스 풀오버", "랫풀다운", "해머 하이로우", "DY로우", "시티드로우", "노틸러스 로우", "리버스 펙덱"]
    },
    {
      title: "LEGS 루틴",
      description: ["이너/아웃타이 머신", "스미스 스쿼트", "브이스쿼트", "레그 익스텐션", "레그 컬", "이두 컬 머신", "프론트레이즈"]
    }
  ],
  "2주차": [],
  "3주차": [],
  "4주차": []
};

const routineOrder = ["PUSH 루틴", "PULL 루틴", "LEGS 루틴"];

export default function RoutinePicker() {
  const [week, setWeek] = useState("1주차");
  const [routine, setRoutine] = useState(null);
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(false);
  const [routineIndex, setRoutineIndex] = useState(0);

  const getNextRoutine = () => {
    const selectedWeek = weeklyRoutines[week];
    const nextTitle = routineOrder[routineIndex % 3];
    const nextRoutine = selectedWeek.find(r => r.title === nextTitle);
    setRoutine(nextRoutine);
    setCompleted(false);
    setNotes("");
    setRoutineIndex(prev => (prev + 1) % 3);
  };

  const markAsCompleted = () => {
    setCompleted(true);
  };

  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col items-center gap-6">
      <div className="w-full">
        <label className="block text-sm font-medium mb-1">현재 주차 선택</label>
        <Select value={week} onValueChange={(val) => { setWeek(val); setRoutineIndex(0); }} className="w-full">
          <SelectItem value="1주차">1주차</SelectItem>
          <SelectItem value="2주차">2주차</SelectItem>
          <SelectItem value="3주차">3주차</SelectItem>
          <SelectItem value="4주차">4주차</SelectItem>
        </Select>
      </div>

      <Button onClick={getNextRoutine} className="text-lg px-6 py-4">
        오늘 루틴 보기 💪
      </Button>

      {routine && (
        <Card className="w-full mt-4">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-6 h-6" />
              <h2 className="text-xl font-semibold">[{week}] {routine.title}</h2>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-base">
              {routine.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="space-y-2">
              <label className="block text-sm font-medium">오늘 컨디션/기록</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="중량, 세트수, 느낌 등 자유롭게 기록하세요"
              />
            </div>
            <Button onClick={markAsCompleted} className="w-full mt-2" variant="outline">
              루틴 완료 표시
            </Button>
            {completed && (
              <div className="text-green-600 flex items-center gap-2 text-sm font-medium mt-2">
                <CheckCircle2 className="w-5 h-5" /> 오늘 루틴 완료!
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
