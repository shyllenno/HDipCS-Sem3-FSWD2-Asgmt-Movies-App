import React from "react";
import FantasyMovieForm from "../components/myFantasyMovieForm";

const MyFantasyMovieAddPage: React.FC = () => {
    return (
        <>

            <FantasyMovieForm title={""} genres={[]} directors={[]} plot={""} cast={[]} image_path={""} />

        </>
    );
};

export default MyFantasyMovieAddPage;