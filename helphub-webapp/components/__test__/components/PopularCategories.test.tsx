import { render, screen } from "@testing-library/react-native";
import React from "react";
import PopulerCategories from "../../PopulerCategories";

describe("PopulerCategories", () => {
    it("renders the title and description", () => {
        render(<PopulerCategories />);

        expect(screen.getByText("popularCategories.title")).toBeTruthy();
        expect(screen.getByText("popularCategories.description")).toBeTruthy();
    });

    it("renders all category cards", () => {
        render(<PopulerCategories />);

        expect(screen.getByText("popularCategories.Astrology")).toBeTruthy();
        expect(screen.getByText("popularCategories.Psychology")).toBeTruthy();
        expect(screen.getByText("popularCategories.Life Coach")).toBeTruthy();
        expect(screen.getByText("popularCategories.Child Development")).toBeTruthy();
        expect(screen.getByText("popularCategories.Dietitian")).toBeTruthy();
        expect(screen.getByText("popularCategories.Family Counseling")).toBeTruthy();
    });

    it('renders the "See All Categories" button', () => {
        render(<PopulerCategories />);

        expect(screen.getByText("popularCategories.buttonText")).toBeTruthy();
    });

    it('renders cards in a row on larger screens and in a column on smaller screens', () => {
        render(<PopulerCategories />);

        const categoryCardsContainer = screen.getByTestId("category-cards-container");

        // Check if the container has the correct class for larger screens
        expect(categoryCardsContainer.props.className).toContain("md:flex-row");

        // Check if the container has the correct class for smaller screens
        expect(categoryCardsContainer.props.className).toContain("flex-col");
    });
});