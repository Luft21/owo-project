import { useRef } from "react";
import { evaluationFields, RadioOption } from "./Sidebar";
import { useAppContext } from "@/context/AppProvider";
import { useDraggable } from "@/hooks/useDraggable";

export default function StickyEvaluationBox({
  currentImageIndex,
}: {
  currentImageIndex: number | null;
}) {
  const boxRef = useRef<HTMLDivElement>(null!);
  const { position, handleMouseDown } = useDraggable<HTMLDivElement>(
    boxRef,
    "sticky-evaluation-box"
  );
  const { pendingCount, isSubmitting, evaluationForm, setEvaluationForm } =
    useAppContext();

  const handleFormChange = (col: string, value: string) => {
    setEvaluationForm((prev) => ({ ...prev, [col]: value }));
  };
  const buttonsDisabled =
    isSubmitting || pendingCount === null || pendingCount === 0;

  const filteredFields = (() => {
    switch (currentImageIndex) {
      case 0:
        return evaluationFields.filter(
          (field) =>
            field.label == "FOTO PAPAN NAMA" || field.label == "GEO TAGGING"
        ); // Fields for image 1
      case 1:
        return evaluationFields.filter(
          (field) => field.label == "FOTO BOX & PIC"
        ); // Fields for image 2
      case 2:
        return evaluationFields.filter(
          (field) => field.label == "FOTO KELENGKAPAN UNIT"
        );
      case 3:
        return evaluationFields.filter(
          (field) => field.label == "FOTO PROSES INSTALASI"
        );
      case 4:
        return evaluationFields.filter(
          (field) => field.label == "FOTO SERIAL NUMBER"
        );
      case 5:
        return evaluationFields.filter(
          (field) => field.label == "FOTO TRAINING"
        );
      case 6:
        return evaluationFields.filter(
          (field) =>
            field.label == "CEKLIS BAPP HAL 1" || field.label == "BARCODE BAPP"
        );
      case 7:
        return evaluationFields.filter(
          (field) =>
            field.label == "CEKLIS BAPP HAL 2" ||
            field.label == "NAMA PENANDATANGANAN BAPP" ||
            field.label == "STEMPEL" ||
            field.label == "KESIMPULAN LENGKAP" ||
            field.label == "PESERTA PELATIHAN" ||
            field.label == "NAMA PENANDATANGANAN BAPP"
        );
      default:
        return [];
    }
  })();

  if (filteredFields.length === 0) return null;

  return (
    <div
      ref={boxRef}
      style={{
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 1000,
        maxWidth: "360px",
        borderRadius: "10px",
        fontFamily: "sans-serif",
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        backgroundColor: "#1e293b", // slate-800
        color: "#f1f5f9", // slate-100
      }}
    >
      {/* Header drag area */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{
          padding: "10px 18px",
          cursor: "move",
          backgroundColor: "#334155", // slate-700
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          color: "#f8fafc", // slate-50
          fontWeight: 600,
        }}
      >
        Form Evaluasi
      </div>

      {/* Content */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        <div className="flex flex-col gap-6">
          {filteredFields.map((field) => (
            <div
              key={field.col}
              className="text-left text-sm border-b border-slate-600 pb-4"
            >
              <label className="font-semibold text-slate-200 mb-2 block text-base">
                {field.label}
              </label>
              <div className="flex flex-wrap gap-3">
                {field.options.map((opt) => (
                  <RadioOption
                    key={opt}
                    field={field}
                    option={opt}
                    checked={evaluationForm[field.col] === opt}
                    onChange={handleFormChange}
                    disabled={buttonsDisabled}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
