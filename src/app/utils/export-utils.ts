import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { toPng } from "html-to-image";

// Add Thai font support for PDF
const addThaiFont = (doc: jsPDF) => {
    doc.setFont("helvetica");
};

export const exportToPDF = async (elementId: string, filename: string = "report.pdf") => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error("Element not found");
        return;
    }

    let loadingDiv: HTMLDivElement | null = null;

    try {
        // Show loading indicator
        loadingDiv = document.createElement("div");
        loadingDiv.id = "export-loading";
        loadingDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(15, 23, 42, 0.95);
      color: white;
      padding: 24px 32px;
      border-radius: 12px;
      z-index: 9999;
      border: 1px solid rgba(99, 102, 241, 0.3);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      font-family: 'Prompt', sans-serif;
    `;
        loadingDiv.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">กำลังสร้าง PDF...</div>
        <div style="font-size: 14px; color: #94a3b8;">กรุณารอสักครู่</div>
      </div>
    `;
        document.body.appendChild(loadingDiv);

        // Clone and prepare element for export
        const cloneContainer = document.createElement("div");
        cloneContainer.style.cssText = `
      position: absolute;
      left: -99999px;
      top: 0;
      width: ${element.offsetWidth}px;
      background: #0f172a;
    `;

        const clone = element.cloneNode(true) as HTMLElement;

        // Remove export-ignore elements from clone
        clone.querySelectorAll(".export-ignore").forEach((el) => el.remove());

        // Replace backdrop-filter with solid background (oklab issue workaround)
        const replaceBackdropFilter = (el: Element) => {
            const htmlEl = el as HTMLElement;
            const computed = window.getComputedStyle(htmlEl);

            if (computed.backdropFilter && computed.backdropFilter !== "none") {
                htmlEl.style.backdropFilter = "none";
                htmlEl.style.webkitBackdropFilter = "none";

                // Replace with semi-transparent solid background
                const bgColor = computed.backgroundColor;
                if (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") {
                    htmlEl.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                }
            }

            // Process all children
            Array.from(el.children).forEach((child) => replaceBackdropFilter(child));
        };

        replaceBackdropFilter(clone);

        cloneContainer.appendChild(clone);
        document.body.appendChild(cloneContainer);

        // Small delay to ensure fonts are loaded
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Generate PNG from element using html-to-image
        const dataUrl = await toPng(clone, {
            quality: 1.0,
            pixelRatio: 2,
            backgroundColor: "#0f172a",
            cacheBust: true,
            filter: (node) => {
                // Skip export-ignore elements
                if (node instanceof HTMLElement) {
                    return !node.classList.contains("export-ignore");
                }
                return true;
            },
            style: {
                transform: "scale(1)",
                transformOrigin: "top left",
            },
        });

        // Clean up clone
        document.body.removeChild(cloneContainer);

        // Create PDF
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
            compress: true,
        });

        addThaiFont(pdf);

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Add gradient background
        pdf.setFillColor(15, 23, 42);
        pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

        // Add decorative header bar
        pdf.setFillColor(99, 102, 241);
        pdf.rect(0, 0, pdfWidth, 12, "F");

        // Add gradient effect
        pdf.setFillColor(139, 92, 246);
        pdf.setGState(new pdf.GState({ opacity: 0.6 }));
        pdf.rect(pdfWidth / 2, 0, pdfWidth / 2, 12, "F");
        pdf.setGState(new pdf.GState({ opacity: 1 }));

        // Add header text
        pdf.setFontSize(16);
        pdf.setTextColor(255, 255, 255);
        pdf.text("Hospital Executive Dashboard", pdfWidth / 2, 7, { align: "center" });

        // Add metadata
        const now = new Date();
        const dateStr = now.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const timeStr = now.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
        });

        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184);
        pdf.text(`สร้างเมื่อ: ${dateStr} เวลา ${timeStr}`, 10, pdfHeight - 5);
        pdf.text(`ไฟล์: ${filename}`, pdfWidth - 10, pdfHeight - 5, { align: "right" });

        // Calculate image dimensions to fit in PDF
        const marginTop = 18;
        const marginBottom = 12;
        const marginSide = 10;
        const availableHeight = pdfHeight - marginTop - marginBottom;
        const availableWidth = pdfWidth - marginSide * 2;

        // Create temporary image to get dimensions
        const img = new Image();
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = dataUrl;
        });

        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgAspectRatio = imgWidth / imgHeight;

        let finalWidth = availableWidth;
        let finalHeight = finalWidth / imgAspectRatio;

        if (finalHeight > availableHeight) {
            finalHeight = availableHeight;
            finalWidth = finalHeight * imgAspectRatio;
        }

        const imgX = (pdfWidth - finalWidth) / 2;
        const imgY = marginTop;

        // Add border around image
        pdf.setDrawColor(71, 85, 105);
        pdf.setLineWidth(0.5);
        pdf.rect(imgX - 2, imgY - 2, finalWidth + 4, finalHeight + 4, "S");

        // Add image to PDF
        pdf.addImage(dataUrl, "PNG", imgX, imgY, finalWidth, finalHeight, undefined, "FAST");

        // Remove loading indicator
        if (loadingDiv && document.body.contains(loadingDiv)) {
            document.body.removeChild(loadingDiv);
        }

        // Save PDF
        pdf.save(filename);
    } catch (error) {
        console.error("Error generating PDF:", error);

        // Remove loading indicator if exists
        if (loadingDiv && document.body.contains(loadingDiv)) {
            document.body.removeChild(loadingDiv);
        }

        alert("เกิดข้อผิดพลาดในการสร้าง PDF กรุณาลองใหม่อีกครั้ง\n\nError: " + (error as Error).message);
    }
};

export const exportTableToExcel = (data: any[], filename: string = "report.xlsx", sheetName: string = "Sheet1") => {
    return exportMultipleSheets([{ name: sheetName, data }], filename);
};

export const exportChartDataToExcel = (chartData: any[], filename: string = "chart-data.xlsx") => {
    exportTableToExcel(chartData, filename, "Chart Data");
};

const sanitizeWorksheetName = (name: string) => {
    let cleaned = name.trim();
    ["\\", "/", "?", "*", "[", "]", ":"].forEach((char) => {
        cleaned = cleaned.replaceAll(char, "-");
    });
    return (cleaned || "Sheet1").slice(0, 31);
};

const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
};

const buildWorksheet = (workbook: ExcelJS.Workbook, name: string, data: any[]) => {
    const worksheet = workbook.addWorksheet(sanitizeWorksheetName(name));

    const allKeys = Array.from(new Set(data.flatMap((row) => Object.keys(row ?? {}))));
    if (allKeys.length === 0) {
        return;
    }

    worksheet.columns = allKeys.map((key) => {
        const maxCellLength = data.reduce((maxLength, row) => {
            const value = row?.[key];
            const text = value == null ? "" : String(value);
            return Math.max(maxLength, text.length);
        }, key.length);

        return {
            header: key,
            key,
            width: Math.min(Math.max(maxCellLength + 2, 12), 50),
        };
    });

    data.forEach((row) => {
        worksheet.addRow(
            allKeys.reduce<Record<string, unknown>>((acc, key) => {
                acc[key] = row?.[key] ?? "";
                return acc;
            }, {}),
        );
    });
};

export const exportMultipleSheets = async (
    sheets: { name: string; data: any[] }[],
    filename: string = "report.xlsx",
) => {
    try {
        const workbook = new ExcelJS.Workbook();

        sheets.forEach((sheet) => {
            buildWorksheet(workbook, sheet.name, sheet.data);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        triggerDownload(blob, filename);
    } catch (error) {
        console.error("Error generating Excel:", error);
    }
};
