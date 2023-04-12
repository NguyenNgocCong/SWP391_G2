package org.example.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class DashboardChartBar {
    private List<String> list_label;
    private List<Double> list_revenue;
    private List<Double> list_sales;
}
