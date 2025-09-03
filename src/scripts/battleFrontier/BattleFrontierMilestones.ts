///<reference path="BattleFrontierMilestone.ts"/>
///<reference path="BattleFrontierMilestoneItem.ts"/>

class BattleFrontierMilestones {

    public static milestoneRewards = [];

    public static addMilestone(milestone: BattleFrontierMilestone) {
        this.milestoneRewards.push(milestone);
        // Sort the milestones by lowest to highest stage incase they are added out of order
        this.milestoneRewards.sort((a, b) => a.stage - b.stage);
    }

    public static nextMileStone() {
        // Get next reward that is unlocked, not obtained, and earned past the latest stage beaten in the active run.
        return this.milestoneRewards.find(r => r.isUnlocked() && !r.obtained() && (r.stage > (BattleFrontierRunner.checkpoint() - 1)));
    }

    public static availableMilestones() {
        return BattleFrontierMilestones.milestoneRewards.filter(r => r.isUnlocked() && !r.obtained() && r.stage > (BattleFrontierRunner.checkpoint() - 1));
    }

    public static nextMileStoneStage(): number {
        // Return the stage number the next reward is unlocked at
        const reward = this.nextMileStone();
        if (reward) {
            return reward.stage;
        } else {
            return Infinity;
        }
    }

    public static nextMileStoneRewardDescription(): string {
        // Return the description of the next reward
        const reward = this.nextMileStone();
        if (reward) {
            return reward.description;
        } else {
            return 'Nothing';
        }
    }

    public static gainReward(defeatedStage: number): void {
        const reward = this.nextMileStone();
        if (reward && reward.stage == defeatedStage) {
            Notifier.notify({
                title: 'Battle Frontier',
                message: `You've successfully defeated stage ${defeatedStage.toLocaleString('en-US')} and earned:\n<span><img src="${reward.image}" height="24px"/> ${reward.description}</span>!`,
                type: NotificationConstants.NotificationOption.info,
                setting: NotificationConstants.NotificationSetting.General.battle_frontier,
                timeout: 1e4,
            });
            App.game.logbook.newLog(
                LogBookTypes.FRONTIER,
                createLogContent.gainBattleFrontierReward({
                    reward: reward.description,
                    stage: defeatedStage.toLocaleString('en-US'),
                })
            );
            reward.gain();
        }
    }
}

BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(5, 'Pokeball', 25));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(10, 'Pokeball', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(20, 'Greatball', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(30, 'Ultraball', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(35, 'xClick', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(40, 'xAttack', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(50, 'SmallRestore', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(75, 'Rare_Candy', 5));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(100, 'Deoxys', new QuestLineStepCompletedRequirement('Mystery of Deoxys', 2)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(110, 'Water_stone', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(120, 'Leaf_stone', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(130, 'Thunder_stone', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(140, 'Fire_stone', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(150, 'MediumRestore', 200));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(151, 'Deoxys (Attack)', new ObtainedPokemonRequirement('Deoxys')));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(160, 'Lucky_egg', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(170, 'Lucky_incense', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(180, 'Dowsing_machine', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(190, 'Mystery_egg', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(200, 'LargeRestore', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(210, 'Water_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(220, 'Leaf_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(230, 'Thunder_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(240, 'Moon_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(250, 'Ultraball', 6400));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(251, 'Deoxys (Defense)', new ObtainedPokemonRequirement('Deoxys')));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(275, 'Rare_Candy', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(300, 'Linking_cord', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(310, 'Dragon_scale', 20));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(320, 'Sun_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(330, 'Kings_rock', 20));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(340, 'Metal_coat', 20));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(350, 'Upgrade', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(375, 'Rare_Candy', 15));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(386, 'Deoxys (Speed)', new ObtainedPokemonRequirement('Deoxys')));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(400, 'Soothe_bell', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(410, 'Deepsea_tooth', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(420, 'Shiny_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(430, 'Deepsea_scale', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(440, 'Dusk_stone', 40, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(450, 'Prism_scale', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(460, 'Dawn_stone', 40, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(470, 'Razor_claw', 10, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(480, 'Razor_fang', 10, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(490, 'Dubious_disc', 10, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(500, 'Ultraball', 10000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(525, 'Magmarizer', 15, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(550, 'Electirizer', 15, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(575, 'Protector', 15, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(600, 'Reaper_cloth', 15, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(660, 'Sachet', 15, new MaxRegionRequirement(GameConstants.Region.kalos)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(666, 'Vivillon (Poké Ball)', new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 34)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(670, 'Whipped_dream', 15, new MaxRegionRequirement(GameConstants.Region.kalos)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(690, 'Lopunnite', 1, new MultiRequirement([new MaxRegionRequirement(GameConstants.Region.kalos), new ObtainedPokemonRequirement('Lopunny')])));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(700, 'Ice_stone', 40, new MaxRegionRequirement(GameConstants.Region.alola)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(750, 'Rare_Candy', 20));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(1000, 'Masterball', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(1500, 'Rare_Candy', 25));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(2000, 'Mismagius (Illusion)', new ObtainedPokemonRequirement('Mismagius')));


BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(2250, 'Pokeball', 250000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(2300, 'Pokeball', 1000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(2500, 'Greatball', 1000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(3000, 'Ultraball', 1000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(3500, 'xClick', 1000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(4000, 'xAttack', 1000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(4500, 'SmallRestore', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(5000, 'Rare_Candy', 5000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(6000, 'Water_stone', 10000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(6250, 'Leaf_stone', 10000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(6500, 'Thunder_stone', 10000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(6750, 'Fire_stone', 10000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(7000, 'MediumRestore', 200000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(7250, 'Lucky_egg', 1000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(7500, 'Lucky_incense', 1000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(7750, 'Dowsing_machine', 1000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(8000, 'Mystery_egg', 1000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(8250, 'LargeRestore', 250000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(8750, 'Water_stone', 40000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(9250, 'Leaf_stone', 40000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(9750, 'Thunder_stone', 40000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(10250, 'Moon_stone', 40000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(10500, 'Ultraball', 6400000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(11000, 'Rare_Candy', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(12000, 'Linking_cord', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(13000, 'Dragon_scale', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(14000, 'Sun_stone', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(15000, 'Kings_rock', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(16000, 'Metal_coat', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(17000, 'Upgrade', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(18000, 'Rare_Candy', 150000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(19000, 'Soothe_bell', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(20000, 'Deepsea_tooth', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(20500, 'Shiny_stone', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(21000, 'Deepsea_scale', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(21500, 'Dusk_stone', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(22000, 'Prism_scale', 100000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(22500, 'Dawn_stone', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(23000, 'Razor_claw', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(23500, 'Razor_fang', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(24000, 'Dubious_disc', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(25000, 'Ultraball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(25500, 'Magmarizer', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(26000, 'Electirizer', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(26500, 'Protector', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(27000, 'Reaper_cloth', 100000, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(27500, 'Sachet', 100000, new MaxRegionRequirement(GameConstants.Region.kalos)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(28000, 'Whipped_dream', 100000, new MaxRegionRequirement(GameConstants.Region.kalos)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(29000, 'Ice_stone', 200000, new MaxRegionRequirement(GameConstants.Region.alola)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(32500, 'Rare_Candy', 400000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(37500, 'Masterball', 10000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(45000, 'Rare_Candy', 2500000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(46000, 'Pokeball', 100000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(47000, 'Greatball', 100000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(48000, 'Ultraball', 100000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(50000, 'Masterball', 75000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(51000, 'Fastball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(52000, 'Quickball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(53000, 'Timerball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(54000, 'Duskball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(55000, 'Luxuryball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(56000, 'Diveball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(57000, 'Lureball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(58000, 'Nestball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(59000, 'Moonball', 10000000));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(80000, 'Repeatball', 10000000));