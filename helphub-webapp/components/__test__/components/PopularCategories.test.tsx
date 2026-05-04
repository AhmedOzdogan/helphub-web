import { render, screen } from "@testing-library/react-native";
import React from "react";
import PopulerCategories from "../../PopulerCategories";

describe("PopulerCategories", () => {
    it("renders the title and description", () => {
        render(<PopulerCategories />);

        expect(screen.getByText("Popular Categories")).toBeTruthy();
        expect(screen.getByText("There will be more than 1.500 experts in 39 categories here for you...")).toBeTruthy();
    });

    it("renders all category cards", () => {
        render(<PopulerCategories />);

        expect(screen.getByText("Astrology")).toBeTruthy();
        expect(screen.getByText("Psychology")).toBeTruthy();
        expect(screen.getByText("Life Coach")).toBeTruthy();
        expect(screen.getByText("Child Development")).toBeTruthy();
        expect(screen.getByText("Dietician")).toBeTruthy();
        expect(screen.getByText("Family Counseling")).toBeTruthy();
    });

    it('renders the "See All Categories" button', () => {
        render(<PopulerCategories />);

        expect(screen.getByText("See All Categories")).toBeTruthy();
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