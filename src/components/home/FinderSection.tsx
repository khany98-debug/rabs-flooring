import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { FlooringFinder } from "@/components/domain/FlooringFinder";
import { Reveal } from "@/components/ui/Reveal";

export function FinderSection() {
  return (
    <Section tone="ink" id="find-my-floor" aria-labelledby="finder-title">
      <Container wide>
        <SectionHeading
          id="finder-title"
          eyebrow="Not sure where to start?"
          title={["Find the floor", "that fits your life."]}
          lead="Most people arrive knowing the room but not the material. Answer two questions and we will tell you where we would start — and why."
          onDark
        />
        <Reveal className="mt-12">
          <FlooringFinder />
        </Reveal>
      </Container>
    </Section>
  );
}
