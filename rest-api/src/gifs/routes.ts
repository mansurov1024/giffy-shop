import { Router } from "express";
import { trendingController } from "./trending.controller";
import { searchController } from "./search.controller";

const router = Router();

router.get('/search', searchController);
router.get('/trending', trendingController);

export default router;