import assert from 'assert';
import { ethers } from 'ethers';

export const SetInitialValuesNext = () =>
  describe('Setting initial values to next deployed contracts', () => {
    it('sets initial values in NRT Manager Contract ESN', async () => {
      const platforms = [
        global.timeallyInstance.address,
        ethers.utils.getAddress(ethers.utils.hexlify(ethers.utils.randomBytes(20))),
      ];
      const perThousands = [150, 850];
      await global.nrtInstanceESN.setInitialValues(platforms, perThousands);

      const { 0: _platforms, 1: _perThousands } = await global.nrtInstanceESN.getPlatformDetails();

      assert.deepEqual(platforms, _platforms, 'platforms should be set correctly');
      assert.deepEqual(
        perThousands,
        _perThousands.map((pT) => pT.toNumber()),
        'per thousands should be set correctly'
      );
    });

    it('sets initial values in TimeAlly Manager Contract ESN', async () => {
      await global.timeallyInstance.setInitialValues(global.nrtInstanceESN.address);

      const nrtAddress = await global.timeallyInstance.nrtManager();
      assert.equal(
        nrtAddress,
        global.nrtInstanceESN.address,
        'nrt address should be set correctly'
      );
    });

    it('adds staking plans in TimeAlly Manager Contract ESN', async () => {
      {
        await global.timeallyInstance.addStakingPlan(12, 13, false);

        const { months, fractionFrom15, estMode } = await global.timeallyInstance.stakingPlans(0);
        assert.deepEqual(months, ethers.BigNumber.from(12), 'months should be set properly');
        assert.deepEqual(
          fractionFrom15,
          ethers.BigNumber.from(13),
          'estMode should be set properly'
        );
        assert.strictEqual(estMode, false, 'estMode should be set properly');
      }
      {
        await global.timeallyInstance.addStakingPlan(24, 15, false);

        const { months, fractionFrom15, estMode } = await global.timeallyInstance.stakingPlans(1);
        assert.deepEqual(months, ethers.BigNumber.from(24), 'months should be set properly');
        assert.deepEqual(
          fractionFrom15,
          ethers.BigNumber.from(15),
          'estMode should be set properly'
        );
        assert.strictEqual(estMode, false, 'estMode should be set properly');
      }
      {
        await global.timeallyInstance.addStakingPlan(24, 15, false);

        const { months, fractionFrom15, estMode } = await global.timeallyInstance.stakingPlans(2);
        assert.deepEqual(months, ethers.BigNumber.from(24), 'months should be set properly');
        assert.deepEqual(
          fractionFrom15,
          ethers.BigNumber.from(15),
          'estMode should be set properly'
        );
        assert.strictEqual(estMode, false, 'estMode should be set properly');
      }
    });
  });