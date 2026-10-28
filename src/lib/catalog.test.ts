import {describe,expect,it} from "vitest";
import {findSampleMovie,getSampleMovies} from "@/lib/sample-data";
import {searchCatalog} from "@/lib/catalog";
describe("sample catalog",()=>{it("contains at least eight demo titles",()=>{expect(getSampleMovies().length).toBeGreaterThanOrEqual(8);});it("finds a title by stable identifier",()=>{expect(findSampleMovie("redline")?.title).toBe("Redline Protocol");});it("filters by title and genre",()=>{const movies=getSampleMovies();expect(searchCatalog(movies,"ocean").map((movie)=>movie.id)).toContain("ocean-below");expect(searchCatalog(movies,"sci-fi").length).toBeGreaterThan(0);});});
