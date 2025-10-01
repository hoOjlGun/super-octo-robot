import CodeEditor from "@/components/CodeEditor";

export default function IDEPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-auto">
        <div className="h-[calc(100%-3rem)]">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}
