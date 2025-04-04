
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Activity = {
  time: string;
  activity: string;
  location: string;
  batch?: string;
};

type TimeTableProps = {
  timetable: Record<string, Activity[]>;
};

export const TimetableView = ({ timetable }: TimeTableProps) => {
  const days = Object.keys(timetable);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <Tabs defaultValue={days.includes(today) ? today : days[0]} className="w-full">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}>
        {days.map((day) => (
          <TabsTrigger key={day} value={day} className="text-sm">
            {day}
          </TabsTrigger>
        ))}
      </TabsList>
      {days.map((day) => (
        <TabsContent key={day} value={day}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{day}'s Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-0 top-0 h-full w-1 border-r-2 border-dashed border-gray-200"></div>
                
                {/* Activities */}
                <div className="ml-6">
                  {timetable[day].map((activity, index) => (
                    <div
                      key={`${day}-${index}`}
                      className={cn(
                        "relative mb-6 pl-4 border-l-2",
                        activity.activity.toLowerCase().includes("break")
                          ? "border-gray-300"
                          : activity.activity.toLowerCase().includes("class") ||
                            activity.activity.toLowerCase().includes("lab") ||
                            activity.activity.toLowerCase().includes("cs")
                          ? "border-kala-500"
                          : "border-blue-500"
                      )}
                    >
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-2 border-gray-300"></div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{activity.time}</span>
                        {activity.batch && (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                            {activity.batch}
                          </span>
                        )}
                      </div>
                      <div className="font-medium">{activity.activity}</div>
                      {activity.location && (
                        <div className="mt-0.5 text-sm text-gray-500">{activity.location}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};
