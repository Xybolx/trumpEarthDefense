import React, { forwardRef } from "react";

export const Fake = forwardRef(({ children }, fakeRef) => (
    <audio ref={fakeRef} src="fake.mp3">
        { children }
    </audio>
));

export const Allfake = forwardRef(({ children }, allFakeRef) => (
    <audio ref={allFakeRef} src="all-fake.mp3">
        { children }
    </audio>
));