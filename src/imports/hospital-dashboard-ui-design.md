Design a desktop web application UI for a Hospital Executive Dashboard.

Use:

1440px desktop frame

12-column grid system

24px outer margin

16px gutter

Auto Layout for all sections

8px spacing system

Card-based layout with 12px corner radius

Soft shadow (subtle elevation)

Style:

Clean, modern healthcare SaaS

White background

Primary color: soft blue (#2563EB)

Success: green (#16A34A)

Warning: amber (#F59E0B)

Danger: red (#DC2626)

Neutral grays for text hierarchy

Inter font or similar modern sans-serif

🧭 Layout Structure
Left Sidebar (Fixed 260px width)

Vertical navigation with icons and labels:

Overview

Budget

Financial

Performance

Statistic

Health Economic

Active state:

Blue background highlight

White icon

Rounded 8px

Top Header (Height 72px)

Right side:

Date range picker

Department dropdown

Fund dropdown

User avatar

Use Auto Layout horizontal spacing 16px.

🏠 Overview Page (Executive Summary)

Main content container:
Auto Layout vertical, 32px spacing

Section 1 – KPI Grid

Grid layout (3 columns x 2 rows)

Each KPI Card:

White card

24px padding

Title (small gray text)

Large bold number

Small trend indicator with arrow icon

% comparison text below

KPIs:

Total OPD Today

IPD Admissions

Bed Occupancy Rate (with mini gauge or progress bar)

Revenue This Month

Collection Rate %

Meeting Attendance %

Section 2 – Charts Row (2 columns)

Left:
Line chart – OPD/IPD trend (30 days)

Right:
Bar chart – Revenue by Fund

Cards with:

Title

Filter indicator

Chart area placeholder

Section 3 – Operational Indicators

Left:
Horizontal bar chart – Meeting Attendance by Department

Right:
Progress-style visualization – Discharge Summary On-Time %

💰 Budget Page

Top Section:
Large comparison bar:
Budget vs Actual

Below:
Department Table Card:
Columns:

Department

Budget

Actual

Variance %

Status Badge (Green / Amber / Red)

Bottom:
Monthly Budget Trend Line Chart

💳 Financial Page

KPI Row (5 cards in one row):

Total Revenue

OPD Revenue

IPD Revenue

Collection Rate %

A/R Days

Charts:

Donut chart – Payer Mix

Bar chart – Collection Rate by Fund

Line chart – Revenue Trend

Table:
Outstanding Billing List (Scrollable)

📈 Performance Page

Create Tab Component:

OPD

IPD

Meeting

HR

Use segmented control style tabs.

OPD Tab:

Patient Volume Trend

Waiting Time by Department

Doctor On-Time %

Top 5 Diagnoses

IPD Tab:

Admission Trend

Bed Occupancy by Ward

ALOS

Discharge Summary %

Meeting Tab:

Attendance % by Department

Attendance Trend

Attendee table with status badge

HR Tab:

Leave Rate

Staff to Patient Ratio

Overtime Trend

📊 Statistic Page

More analytical layout:

OPD/IPD yearly growth trend

Top 10 Diagnoses bar chart

Readmission Rate

Infection Rate

Patient Satisfaction

Use slightly denser layout (more data per screen).

🏥 Health Economic Page

KPI Row:

Cost per Case

Revenue per Bed

Case Mix Index

Average Length of Stay

Charts:

ALOS by DRG

High Cost Cases

Physician Productivity

Revenue per Doctor

Use more data-heavy card styling.

🧩 Component System Requirement

Create reusable components:

KPI Card

Chart Card

Status Badge

Filter Dropdown

Sidebar Item

Data Table

Tab Switcher

Use consistent Auto Layout and variants for states.